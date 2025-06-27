import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { ImMagicWand } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const API = process.env.REACT_APP_API_URL || 'https://leadreachai.onrender.com';

type FormStep = 'initial' | 'personalization' | 'calling' | 'report';

interface CallReport {
  call_id: string;
  call_status: string;
  call_duration: number;
  recording_url?: string;
  transcript?: string;
  summary?: string;
  sentiment?: string;
  key_topics?: string;
  engagement_level?: string;
  interested?: boolean;
  business_type?: string;
  pain_points?: string;
  follow_up_requested?: boolean;
  start_time?: number;
  end_time?: number;
  from_number?: string;
  to_number?: string;
  caller_name?: string;
  caller_email?: string;
}

const DemoForm = () => {
  // Form step state
  const [currentStep, setCurrentStep] = useState<FormStep>('initial');
  const [tcpaModalOpen, setTcpaModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callData, setCallData] = useState<any>(null);
  const [callReport, setCallReport] = useState<CallReport | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Form data state
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('English');
  const [accent, setAccent] = useState('US');
  const [voiceType, setVoiceType] = useState('Female');

  // Refs for direct DOM access
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus name input when personalization step loads
  useEffect(() => {
    if (currentStep === 'personalization' && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [currentStep]);

  // Poll for call status and report
  useEffect(() => {
    if (callData?.call?.call_id && currentStep === 'calling') {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`${API}/api/call-report/${callData.call.call_id}`);
          if (response.ok) {
            const reportData = await response.json();
            if (reportData.success && reportData.report) {
              if (reportData.report.call_status === 'ended' || reportData.report.call_status === 'completed') {
                setCallReport(reportData.report);
                setCurrentStep('report');
                clearInterval(pollInterval);
              } else if (reportData.report.call_status === 'failed') {
                setCallReport({
                  call_id: reportData.report.call_id,
                  call_status: 'failed',
                  call_duration: 0,
                  transcript: 'Call failed to complete',
                });
                setCurrentStep('report');
                clearInterval(pollInterval);
              }
            }
          }
        } catch (error) {
          console.error('Error polling call status:', error);
        }
      }, 3000);

      setTimeout(() => {
        clearInterval(pollInterval);
        if (currentStep === 'calling') {
          setCallReport({
            call_id: callData.call.call_id,
            call_status: 'timeout',
            call_duration: 0,
            transcript: 'Call may still be in progress. Please check back later.',
          });
          setCurrentStep('report');
        }
      }, 300000);

      return () => clearInterval(pollInterval);
    }
  }, [callData, currentStep]);

  // Simple handlers - direct DOM manipulation approach
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  };

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handlePhoneSubmit = () => {
    if (!phone || phone.length < 10) {
      toast({
        title: 'Error',
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      });
      return;
    }
    setTcpaModalOpen(true);
  };

  const handleTcpaAgree = () => {
    setTcpaModalOpen(false);
    setCurrentStep('personalization');
  };

  const handlePersonalizationSubmit = async () => {
    // Simple validation
    if (!name.trim()) {
      toast({ title: 'Error', description: 'Name is required', variant: 'destructive' });
      return;
    }
    if (!email.trim()) {
      toast({ title: 'Error', description: 'Email is required', variant: 'destructive' });
      return;
    }
    if (!email.includes('@')) {
      toast({ title: 'Error', description: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API}/api/demo-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_number: phone,
          caller_name: name,
          caller_email: email,
          language: language,
          accent: accent,
          voice_type: voiceType,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCallData(data);
        setCurrentStep('calling');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to initiate call',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error making demo call:', error);
      toast({
        title: 'Error',
        description: 'Failed to initiate call. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailReport = async () => {
    const recipientEmail = callReport?.caller_email || email;
    const recipientName = callReport?.caller_name || name;

    if (!callReport || !recipientEmail) {
      toast({
        title: 'Error',
        description: 'No email address available to send the report.',
        variant: 'destructive',
      });
      return;
    }

    setSendingEmail(true);
    try {
      const response = await fetch(`${API}/api/send-call-report-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          call_id: callReport.call_id,
          user_email: recipientEmail,
          user_name: recipientName || 'Demo User',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setEmailSent(true);
        toast({
          title: 'Email Sent!',
          description: `Your call report has been sent to ${recipientEmail}`,
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to send email report.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send email report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      case 'neutral': return '😐';
      default: return '📊';
    }
  };

  const getEngagementEmoji = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return '🔥';
      case 'medium': return '👍';
      case 'low': return '😐';
      default: return '❓';
    }
  };

  // Render functions
  const renderInitialStep = () => (
    <div className="space-y-6">
      <h3 className="text-3xl md:text-3xl font-bold mb-6 text-center">
        Your AI Agent Is Calling <span className="text-[#edff81]">- Are You Ready?</span>
      </h3>
      <div className="justify-items-end">
        <img src="/images/try-it-now-1.png" alt="Try It Now" className="h-48" />
      </div>
      <div>
        <PhoneInput
          country={'us'}
          value={phone}
          onChange={handlePhoneChange}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: true,
          }}
          containerStyle={{
            width: '100%',
            height: '64px',
          }}
          inputStyle={{
            width: '100%',
            height: '64px',
            fontSize: '16px',
            border: '1px solid #64748b',
            borderRadius: '6px',
            backgroundColor: 'white',
            color: 'black',
            paddingLeft: '60px',
          }}
          buttonStyle={{
            border: '1px solid #64748b',
            borderRadius: '6px 0 0 6px',
            backgroundColor: 'white',
          }}
          dropdownStyle={{
            backgroundColor: 'white',
            color: 'black',
          }}
        />
      </div>
      <Button
        onClick={handlePhoneSubmit}
        className="w-full h-16 text-lg font-semibold"
        disabled={!phone || phone.length < 10}
      >
        Next <FaArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const renderPersonalizationStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Customize Your AI Call Experience</h2>
      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Name *"
              value={name}
              onInput={handleNameInput}
              className="w-full h-12 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
          <div>
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Email *"
              value={email}
              onInput={handleEmailInput}
              className="w-full h-12 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          The call will automatically end after 5 minutes.
        </p>
        <Button
          onClick={handlePersonalizationSubmit}
          disabled={isLoading || !name.trim() || !email.trim()}
          className="w-full h-12 text-lg font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initiating Call...
            </div>
          ) : (
            <>
              <ImMagicWand className="ml-2" />
              Yes! I Want to Hear the Magic
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderCallingStep = () => (
    <div className="text-center space-y-6">
      <div className="animate-pulse">
        <BiSolidPhoneCall className="w-16 h-16 mx-auto text-[#edff7e]" />
      </div>
      <h2 className="text-2xl font-bold">We're Calling You Now!</h2>
      <p className="text-gray-600">We're calling you from this number:</p>
      <p className="text-xl font-semibold">+1 (352) 839-6109</p>
      {callData && (
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-green-800">Call ID: {callData.call?.call_id}</p>
          <p className="text-green-800">Status: {callData.call?.call_status}</p>
        </div>
      )}
      <div className="text-sm text-gray-500">
        <p>Waiting for call to complete...</p>
        <p>This may take a few minutes</p>
      </div>
    </div>
  );

  const renderReportStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Call Report</h2>
      {callReport ? (
        <>
          <div className="bg-gray-50 p-4 rounded-lg text-black">
            <h3 className="font-semibold mb-2">Call Summary</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Duration:</strong> {callReport.call_duration ? formatDuration(callReport.call_duration) : 'N/A'}</p>
              <p><strong>Status:</strong> {callReport.call_status}</p>
              <p><strong>Call ID:</strong> {callReport.call_id}</p>
              {callReport.start_time && <p><strong>Start Time:</strong> {formatTimestamp(callReport.start_time)}</p>}
              {callReport.end_time && <p><strong>End Time:</strong> {formatTimestamp(callReport.end_time)}</p>}
              {callReport.from_number && <p><strong>From:</strong> {callReport.from_number}</p>}
              {callReport.to_number && <p><strong>To:</strong> {callReport.to_number}</p>}
            </div>
            {callReport.call_status === 'failed' && (
              <div className="mt-2 p-2 bg-red-100 rounded text-red-800">
                <p>❌ Call failed to complete. Please try again.</p>
              </div>
            )}
            {callReport.call_status === 'timeout' && (
              <div className="mt-2 p-2 bg-yellow-100 rounded text-yellow-800">
                <p>⏰ Call may still be in progress. Please check back later.</p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {callReport.recording_url && callReport.call_status === 'ended' && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Call Recording</h3>
                <audio controls className="w-full">
                  <source src={callReport.recording_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <Button
                  variant="outline"
                  className="mt-2 text-black"
                  onClick={() => window.open(callReport.recording_url, '_blank')}
                >
                  <FaDownload className="mr-2 text-black" /> Download Recording
                </Button>
              </div>
            )}
            {callReport.transcript && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Call Transcript</h3>
                <div className="max-h-40 overflow-y-auto text-sm bg-gray-50 p-3 rounded text-black">
                  {callReport.transcript.split('\n').map((line, index) => (
                    <p key={index} className="mb-1">{line}</p>
                  ))}
                </div>
              </div>
            )}
            {callReport.call_status === 'ended' && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI Insights</h3>
                <div className="space-y-2">
                  {callReport.sentiment && (
                    <p>{getSentimentEmoji(callReport.sentiment)} Sentiment: {callReport.sentiment}</p>
                  )}
                  {callReport.key_topics && <p>💡 Key Topics: {callReport.key_topics}</p>}
                  {callReport.engagement_level && (
                    <p>{getEngagementEmoji(callReport.engagement_level)} Engagement Level: {callReport.engagement_level}</p>
                  )}
                  {callReport.interested !== undefined && (
                    <p>🎯 Interest Level: {callReport.interested ? 'Interested' : 'Not Interested'}</p>
                  )}
                  {callReport.business_type && <p>🏢 Business Type: {callReport.business_type}</p>}
                  {callReport.pain_points && <p>⚠️ Pain Points: {callReport.pain_points}</p>}
                  {callReport.follow_up_requested && <p>📞 Follow-up Requested: Yes</p>}
                </div>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="text-lg font-medium text-blue-800 mb-3">
                📧 Get Detailed Report via Email
              </h4>
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700">
                    <strong>Email will be sent to:</strong> {callReport.caller_email || email}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Name:</strong> {callReport.caller_name || name}
                  </p>
                </div>
                <Button
                  onClick={sendEmailReport}
                  disabled={sendingEmail || emailSent}
                  className="w-full"
                >
                  {sendingEmail ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Report...
                    </>
                  ) : emailSent ? (
                    <>
                      <FaCheck className="mr-2 h-4 w-4" />
                      Report Sent!
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Detailed Report to Email
                    </>
                  )}
                </Button>
                {emailSent && (
                  <p className="text-sm text-green-600 text-center">
                    ✅ Detailed report sent successfully! Check your email inbox.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No call report available yet.</p>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return renderInitialStep();
      case 'personalization':
        return renderPersonalizationStep();
      case 'calling':
        return renderCallingStep();
      case 'report':
        return renderReportStep();
      default:
        return renderInitialStep();
    }
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 border border-slate-700 bg-black/[0.31]">
      <Dialog open={tcpaModalOpen} onOpenChange={setTcpaModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="flex items-center mb-4">
            <label htmlFor="default-checkbox" className="relative flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                onClick={handleTcpaAgree}
                className="peer w-4 h-4 appearance-none rounded-sm bg-gray-100 border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:ring-2 focus:ring-blue-500"
              />
              <FaCheck className="absolute left-[2px] top-[2px] text-white text-[10px] opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </label>
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">
              <p className="text-sm text-gray-600 leading-5">
                By submitting your number, you agree to receive automated texts and/or
                calls from <span className="font-medium text-gray-800">LeadReachAi.com</span>.
                Consent isn't required to purchase. Msg & data rates may apply. Reply
                STOP to opt out.
              </p>
            </label>
          </div>
        </DialogContent>
      </Dialog>
      {renderStep()}
      <Toaster />
    </div>
  );
};

export default DemoForm;