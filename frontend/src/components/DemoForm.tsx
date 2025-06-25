import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FaArrowRight, FaPhone, FaDownload, FaShare } from 'react-icons/fa';
import { IoCallSharp } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import { ImMagicWand } from "react-icons/im";
import { FaCheck } from "react-icons/fa";


type FormStep = 'initial' | 'personalization' | 'calling' | 'report';

interface FormData {
  phone: string;
  name: string;
  email: string;
  message: string;
  language: string;
  accent: string;
  voiceType: string;
}

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
}

const DemoForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('initial');
  const [tcpaModalOpen, setTcpaModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callData, setCallData] = useState<any>(null);
  const [callReport, setCallReport] = useState<CallReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    name: '',
    email: '',
    message: '',
    language: 'English',
    accent: 'US',
    voiceType: 'Female'
  });

  // Poll for call status and report
  useEffect(() => {
    if (callData?.call?.call_id && currentStep === 'calling') {
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:3003/api/call-report/${callData.call.call_id}`);
          if (response.ok) {
            const reportData = await response.json();
            if (reportData.success && reportData.report) {
              // Check if call is completed
              if (reportData.report.call_status === 'ended' || reportData.report.call_status === 'completed') {
                setCallReport(reportData.report);
                setCurrentStep('report');
                clearInterval(pollInterval);
              } else if (reportData.report.call_status === 'failed') {
                // Handle failed call
                setCallReport({
                  call_id: reportData.report.call_id,
                  call_status: 'failed',
                  call_duration: 0,
                  transcript: 'Call failed to complete'
                });
                setCurrentStep('report');
                clearInterval(pollInterval);
              }
              // If call is still ongoing, continue polling
            } else if (response.status === 404) {
              // Call not found yet, continue polling
              console.log('Call not found yet, continuing to poll...');
            }
          }
        } catch (error) {
          console.error('Error polling call status:', error);
        }
      }, 3000); // Poll every 3 seconds

      // Stop polling after 5 minutes (300 seconds)
      setTimeout(() => {
        clearInterval(pollInterval);
        if (currentStep === 'calling') {
          // If still calling after 5 minutes, show report with limited data
          setCallReport({
            call_id: callData.call.call_id,
            call_status: 'timeout',
            call_duration: 0,
            transcript: 'Call may still be in progress. Please check back later.'
          });
          setCurrentStep('report');
        }
      }, 300000);

      return () => clearInterval(pollInterval);
    }
  }, [callData, currentStep]);

  const handlePhoneSubmit = () => {
    if (!formData.phone) {
      alert('Please enter your phone number');
      return;
    }
    setTcpaModalOpen(true);
  };

  const handleTcpaAgree = () => {
    setTcpaModalOpen(false);
    setCurrentStep('personalization');
  };

  const handlePersonalizationSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert('Please enter your name and email');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3003/api/demo-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_number: formData.phone,
          caller_name: formData.name,
          caller_email: formData.email,
          language: formData.language,
          accent: formData.accent,
          voice_type: formData.voiceType,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setCallData(data);
        setCurrentStep('calling');
      } else {
        alert('Failed to initiate call: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error making demo call:', error);
      alert('Failed to initiate call. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCallReport = async () => {
    if (!callData?.call?.call_id) return;
    
    setIsLoadingReport(true);
    try {
      const response = await fetch(`http://localhost:3003/api/call-report/${callData.call.call_id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCallReport(data.report);
        }
      }
    } catch (error) {
      console.error('Error fetching call report:', error);
    } finally {
      setIsLoadingReport(false);
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
    switch (level?.toLowerCase()) {
      case 'high': return '🔥';
      case 'medium': return '👍';
      case 'low': return '😴';
      default: return '🎯';
    }
  };

  const TCPAModal = () => (
    <Dialog open={tcpaModalOpen} onOpenChange={setTcpaModalOpen}>
      <DialogContent className="sm:max-w-au ">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
        </DialogHeader>
        <div className="flex items-center mb-4">
          <label htmlFor="default-checkbox" className="relative flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              onClick={handleTcpaAgree}
              className="peer w-4 h-4 appearance-none rounded-sm bg-gray-100 border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:ring-2 focus:ring-blue-500"
            />
            <FaCheck className="absolute left-[2px] top-[2px] text-white text-[10px] opacity-0 peer-checked:opacity-100 pointer-events-none" />

          </label>
          <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
  );

  const InitialStep = () => (
    <div className="space-y-6">
      <h3 className="text-3xl md:text-3xl font-bold mb-6 text-center">
        Your Ai Agent  Is Calling  <span className="text-[#edff81]">- Are You Ready?</span>
      </h3>

      <div className='justify-items-end'>
        <img src="/images/try-it-now-1.png" alt="Try It Now" className="h-48" />
      </div>
      <div>
        <PhoneInput
          international
          defaultCountry="US"
          value={formData.phone}
          onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
          className="border border-slate-600 bg-white text-black placeholder-gray-400 rounded-md px-3 py-2 w-full h-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button
        onClick={handlePhoneSubmit}
        className="w-full h-16 text-lg font-semibold"
      >
        Next <FaArrowRight className="ml-2" />
      </Button>
    </div>
  );

  const PersonalizationStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Customize Your AI Call Experience</h2>

      <div className="space-y-4">
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <p className="text-sm text-gray-500 text-center">
          The call will automatically end after 5 minutes.
        </p>

        <Button
          onClick={handlePersonalizationSubmit}
          disabled={isLoading}
          className="w-full h-12 text-lg font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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

  const CallingStep = () => (
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

  const ReportStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Call Report</h2>

      {isLoadingReport ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading call report...</p>
        </div>
      ) : callReport ? (
        <>
          <div className="bg-gray-50 p-4 rounded-lg text-black">
            <h3 className="font-semibold mb-2">Call Summary</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Duration:</strong> {callReport.call_duration ? formatDuration(callReport.call_duration) : 'N/A'}</p>
              <p><strong>Status:</strong> {callReport.call_status}</p>
              <p><strong>Call ID:</strong> {callReport.call_id}</p>
              {callReport.start_time && (
                <p><strong>Start Time:</strong> {formatTimestamp(callReport.start_time)}</p>
              )}
              {callReport.end_time && (
                <p><strong>End Time:</strong> {formatTimestamp(callReport.end_time)}</p>
              )}
              {callReport.from_number && (
                <p><strong>From:</strong> {callReport.from_number}</p>
              )}
              {callReport.to_number && (
                <p><strong>To:</strong> {callReport.to_number}</p>
              )}
            </div>
            
            {/* Show status-specific messages */}
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
                  className="mt-2"
                  onClick={() => window.open(callReport.recording_url, '_blank')}
                >
                  <FaDownload className="mr-2" /> Download Recording
                </Button>
              </div>
            )}

            {callReport.transcript && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Call Transcript</h3>
                <div className="max-h-40 overflow-y-auto text-sm bg-gray-50 p-3 rounded">
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
                  {callReport.key_topics && (
                    <p>💡 Key Topics: {callReport.key_topics}</p>
                  )}
                  {callReport.engagement_level && (
                    <p>{getEngagementEmoji(callReport.engagement_level)} Engagement Level: {callReport.engagement_level}</p>
                  )}
                  {callReport.interested !== undefined && (
                    <p>🎯 Interest Level: {callReport.interested ? 'Interested' : 'Not Interested'}</p>
                  )}
                  {callReport.business_type && (
                    <p>🏢 Business Type: {callReport.business_type}</p>
                  )}
                  {callReport.pain_points && (
                    <p>⚠️ Pain Points: {callReport.pain_points}</p>
                  )}
                  {callReport.follow_up_requested && (
                    <p>📞 Follow-up Requested: Yes</p>
                  )}
                </div>
              </div>
            )}

            <Button className="w-full" onClick={() => {
              const emailBody = `Call Report for ${formData.name}\n\nCall ID: ${callReport.call_id}\nDuration: ${formatDuration(callReport.call_duration || 0)}\nStatus: ${callReport.call_status}\n\nTranscript:\n${callReport.transcript || 'No transcript available'}\n\nAI Insights:\nSentiment: ${callReport.sentiment || 'N/A'}\nKey Topics: ${callReport.key_topics || 'N/A'}\nEngagement: ${callReport.engagement_level || 'N/A'}`;
              const mailtoLink = `mailto:${formData.email}?subject=LeadReachAi Demo Call Report&body=${encodeURIComponent(emailBody)}`;
              window.open(mailtoLink);
            }}>
              <FaShare className="mr-2" /> Send Report to Email
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No call report available yet.</p>
          <Button onClick={fetchCallReport} disabled={isLoadingReport}>
            {isLoadingReport ? 'Loading...' : 'Refresh Report'}
          </Button>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'initial':
        return <InitialStep />;
      case 'personalization':
        return <PersonalizationStep />;
      case 'calling':
        return <CallingStep />;
      case 'report':
        return <ReportStep />;
      default:
        return <InitialStep />;
    }
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 border border-slate-700 bg-black/[0.31]">
      <TCPAModal />
      {renderStep()}
    </div>
  );
};

export default DemoForm;
