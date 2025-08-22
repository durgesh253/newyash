import { useState, useEffect, useRef, useCallback } from 'react';
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

type FormStep = 'initial' | 'personalization' | 'calling' | 'report';

interface CallData {
  call: {
    call_id: string;
    call_status: string;
    from_number: string;
  };
  success: boolean;
}

interface CallReport {
  call_id: string;
  call_status: string;
  call_duration: number;
  recording_url?: string;
  transcript?: string;
  summary?: string;
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
  const [isPolling, setIsPolling] = useState(false);
  const [pollingStatus, setPollingStatus] = useState('');
  const [callData, setCallData] = useState<CallData | null>(null);
  const [callReport, setCallReport] = useState<CallReport | null>(null);
  const [isPrefilledFlow, setIsPrefilledFlow] = useState(false);

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

  // Handle URL parameters for pre-filled phone number
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const phoneParam = urlParams.get('phone');
    
    if (phoneParam && phoneParam.trim()) {
      // Set the phone number from URL parameter
      setPhone(phoneParam.trim());
      // Automatically move to personalization step
      setCurrentStep('personalization');
      setIsPrefilledFlow(true);
    }
  }, []);

  // Poll for call status and report - OPTIMIZED WITH EXPONENTIAL BACKOFF
  // Alternative: Consider WebSocket connection for real-time updates from Retell
  // This would eliminate polling entirely and provide instant status updates
  useEffect(() => {
    if (callData?.call?.call_id && currentStep === 'calling') {
      let pollTimeout: NodeJS.Timeout;
      let timeoutId: NodeJS.Timeout;
      let retryCount = 0;
      const maxRetries = 25;
      const baseDelay = 2000; // Start with 2 seconds

      const getPollingDelay = (callStatus: string, retryCount: number) => {
        // Different delays based on call status
        switch (callStatus) {
          case 'registered':
          case 'ongoing':
            // More frequent polling for active calls
            return Math.min(baseDelay * Math.pow(1.2, retryCount), 10000); // Max 10 seconds
          case 'connecting':
          case 'ringing':
            // Medium frequency for connecting calls
            return Math.min(baseDelay * Math.pow(1.5, retryCount), 15000); // Max 15 seconds
          default:
            // Slower polling for other states
            return Math.min(baseDelay * Math.pow(2, retryCount), 30000); // Max 30 seconds
        }
      };

      const pollCallStatus = async () => {
        try {
          setPollingStatus(`Checking call status... (Attempt ${retryCount + 1}/${maxRetries})`);
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3003'}/api/call-report/${callData.call.call_id}`);
          
          if (response.ok) {
            const reportData = await response.json();
            if (reportData.success && reportData.report) {
              const callStatus = reportData.report.call_status;
              setPollingStatus(`Call status: ${callStatus}`);
              
              // Stop polling for terminal states
              if (callStatus === 'ended' || callStatus === 'completed' || callStatus === 'failed') {
                clearTimeout(timeoutId);
                setIsPolling(false);
                setPollingStatus('');
                
                if (callStatus === 'failed') {
                  setCallReport({
                    call_id: reportData.report.call_id,
                    call_status: 'failed',
                    call_duration: 0,
                    transcript: 'Call failed to complete',
                  });
                } else {
                  setCallReport(reportData.report);
                }
                setCurrentStep('report');
                return;
              }
              
              // Continue polling with adaptive delay
              if (retryCount < maxRetries) {
                retryCount++;
                const delay = getPollingDelay(callStatus, retryCount);
                pollTimeout = setTimeout(pollCallStatus, delay);
              } else {
                // Max retries reached, show timeout
                clearTimeout(timeoutId);
                setIsPolling(false);
                setPollingStatus('');
                setCallReport({
                  call_id: callData.call.call_id,
                  call_status: 'timeout',
                  call_duration: 0,
                  transcript: 'Call may still be in progress. Please check back later.',
                });
                setCurrentStep('report');
              }
            } else {
              // Invalid response, retry with exponential backoff
              if (retryCount < maxRetries) {
                retryCount++;
                const delay = Math.min(baseDelay * Math.pow(2, retryCount), 30000);
                pollTimeout = setTimeout(pollCallStatus, delay);
              }
            }
          } else {
            console.error('Failed to fetch call report:', response.status, response.statusText);
            setPollingStatus(`Error: ${response.status} - Retrying...`);
            // Retry on error with exponential backoff
            if (retryCount < maxRetries) {
              retryCount++;
              const delay = Math.min(baseDelay * Math.pow(2, retryCount), 30000);
              pollTimeout = setTimeout(pollCallStatus, delay);
            }
          }
        } catch (error) {
          console.error('Error polling call status:', error);
          setPollingStatus('Connection error - Retrying...');
          // Retry on error with exponential backoff
          if (retryCount < maxRetries) {
            retryCount++;
            const delay = Math.min(baseDelay * Math.pow(2, retryCount), 30000);
            pollTimeout = setTimeout(pollCallStatus, delay);
          }
        }
      };

      const startPolling = () => {
        setIsPolling(true);
        retryCount = 0;
        pollTimeout = setTimeout(pollCallStatus, baseDelay);

        // Set timeout to stop polling after 5 minutes
        timeoutId = setTimeout(() => {
          if (pollTimeout) clearTimeout(pollTimeout);
          setIsPolling(false);
          if (currentStep === 'calling') {
            setCallReport({
              call_id: callData.call.call_id,
              call_status: 'timeout',
              call_duration: 0,
              transcript: 'Call may still be in progress. Please check back later.',
            });
            setCurrentStep('report');
          }
        }, 300000); // 5 minutes
      };

      startPolling();

      // Cleanup function
      return () => {
        if (pollTimeout) clearTimeout(pollTimeout);
        if (timeoutId) clearTimeout(timeoutId);
        setIsPolling(false);
        setPollingStatus('');
      };
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
    setCurrentStep('personalization');
  };



  const handlePersonalizationSubmit = async () => {
    // Validate required fields before showing consent modal
    if (!name.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter your name to proceed',
        variant: 'destructive',
      });
      return;
    }
    
    if (!email.trim()) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email to proceed',
        variant: 'destructive',
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }
    
    // Show consent modal - all validation passed
    setTcpaModalOpen(true);
  };

  const initiateCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3003'}/api/demo-call`, {
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

  const handleConsentButtonClick = () => {
    // Only validate consent checkbox - user has already provided name and email
    const checkbox = document.getElementById('consent-checkbox') as HTMLInputElement;
    if (checkbox?.checked) {
      setTcpaModalOpen(false);
      initiateCall();
    } else {
      toast({
        title: 'Consent Required',
        description: 'Please check the consent box to proceed',
        variant: 'destructive',
      });
    }
  };

  // Reset functionality
  const handleReset = useCallback(() => {
    setCurrentStep('initial');
    setCallData(null);
    setCallReport(null);
    setPhone('');
    setName('');
    setEmail('');
    setLanguage('English');
    setAccent('US');
    setVoiceType('Female');
    setIsPolling(false);
    setPollingStatus('');
    setIsPrefilledFlow(false);
  }, []);

  // Memoized utility functions
  const formatDuration = useCallback((seconds: number) => {
    if (!seconds || seconds <= 0) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const formatTimestamp = useCallback((timestamp: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
  }, []);

  // Render functions
  const renderInitialStep = () => (
    <div className="space-y-6">
      <h3 className="text-3xl md:text-3xl font-bold mb-6 text-center">
        {isPrefilledFlow 
          ? "Welcome Back! Let's Continue Your AI Call" 
          : "Your AI Agent Is Calling - Are You Ready?"
        }
        {!isPrefilledFlow && <span className="text-[#edff81]"> - Are You Ready?</span>}
      </h3>
      <div className="justify-items-end">
        <img src="/images/try-it-now-1.png" alt="Try It Now" className="h-48" />
      </div>
      
      {/* Only show phone input if not in pre-filled flow */}
      {!isPrefilledFlow && (
        <>
          <div>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
                'aria-label': 'Enter your phone number',
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
        </>
      )}
      
      {/* Show continue button for pre-filled flow */}
      {isPrefilledFlow && (
        <Button
          onClick={() => setCurrentStep('personalization')}
          className="w-full h-16 text-lg font-semibold"
        >
          Continue Setup <FaArrowRight className="ml-2" />
        </Button>
      )}
    </div>
  );

  const renderPersonalizationStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        {isPrefilledFlow 
          ? "Complete Your AI Call Setup" 
          : "Customize Your AI Call Experience"
        }
      </h2>
      
      {/* Show pre-filled phone number if it came from URL */}
      {isPrefilledFlow && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Phone Number Pre-filled</p>
              <p className="text-sm text-blue-600">{phone}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStep('initial');
                setIsPrefilledFlow(false);
              }}
              className="text-xs text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Change
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Name *"
              value={name}
              onInput={handleNameInput}
              aria-label="Enter your name"
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
              aria-label="Enter your email"
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
              {isPrefilledFlow ? "Start My AI Call" : "Yes! I Want to Hear the Magic"}
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
      <p className="text-xl font-semibold">{callData?.call?.from_number}</p>
      {callData && (
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-green-800">Status: {callData.call?.call_status}</p>
        </div>
      )}
      <div className="text-sm text-gray-500">
        <p>Waiting for call to complete...</p>
        <p>This may take a few minutes</p>
        {isPolling && (
          <div className="mt-2 flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>{pollingStatus || 'Checking call status...'}</span>
          </div>
        )}
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

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <h4 className="text-lg font-medium text-green-800 mb-3">
                📧 Email Report Sent Automatically
              </h4>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <strong>✅ Email sent to:</strong> {callReport.caller_email || email}
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Name:</strong> {callReport.caller_name || name}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-green-600 mb-2">
                    <FaCheck className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Email Report Delivered</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your detailed call report has been automatically sent to your email inbox.
                    Please check your spam folder if you don't see it.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleReset}
                variant="outline"
                className="text-black border-gray-300 hover:bg-gray-50"
              >
                Try Another Demo Call
              </Button>
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
      <Dialog open={tcpaModalOpen} onOpenChange={(open) => {
        if (!open) {
          // If user closes modal without agreeing, go back to personalization step
          setTcpaModalOpen(false);
        }
      }}>
                 <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl shadow-2xl">
           {/* Header with gradient background */}
           <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
             <div className="flex items-center space-x-3">
               <div className="bg-white/20 p-1.5 rounded-full">
                 <BiSolidPhoneCall className="w-5 h-5" />
               </div>
               <div>
                 <DialogTitle className="text-lg font-bold">Demo Call Consent</DialogTitle>
                 <p className="text-blue-100 text-xs mt-0.5">One step away from experiencing AI magic!</p>
               </div>
             </div>
           </div>

           {/* Content */}
           <div className="p-4 space-y-4">
             {/* User info summary */}
             <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
               <h3 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                 <FaCheck className="w-3 h-3 text-green-500 mr-2" />
                 Your Information
               </h3>
               <div className="space-y-1 text-xs">
                 <div className="flex justify-between">
                   <span className="text-gray-600">Phone:</span>
                   <span className="font-medium text-gray-800">{phone}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Name:</span>
                   <span className="font-medium text-gray-800">{name}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Email:</span>
                   <span className="font-medium text-gray-800 truncate max-w-[150px]" title={email}>{email}</span>
                 </div>
               </div>
             </div>

             {/* Consent section */}
             <div className="space-y-3">
               <div className="flex items-start space-x-3">
                 <div className="flex-shrink-0 mt-0.5">
                   <input
                     id="consent-checkbox"
                     type="checkbox"
                     className="w-4 h-4 text-blue-600 bg-white border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0"
                   />
                 </div>
                 <div className="flex-1">
                   <label htmlFor="consent-checkbox" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
                     I agree to receive an automated demo call from{' '}
                     <span className="font-semibold text-blue-600">LeadReachAi.com</span> at the phone number I provided. 
                     I understand this is a demo call and consent to receive automated calls and/or texts.
                   </label>
                   <div className="mt-2 text-xs text-gray-500 bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                     💡 This is a 5-minute demo call to showcase our AI capabilities. 
                     Msg & data rates may apply. Reply STOP to opt out.
                   </div>
                 </div>
               </div>
             </div>

             {/* Action buttons */}
             <div className="flex space-x-2 pt-3">
                               <Button
                  onClick={handleConsentButtonClick}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                 <ImMagicWand className="w-3 h-3 mr-1.5" />
                 Start Demo Call
               </Button>
               <Button
                 variant="outline"
                 onClick={() => {
                   setTcpaModalOpen(false);
                 }}
                 className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
               >
                 Cancel
               </Button>
             </div>

             {/* Additional info */}
             <div className="text-center pt-2">
               <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full inline-block">
                 🔒 Your information is secure and will only be used for this demo call
               </p>
             </div>
           </div>
         </DialogContent>
      </Dialog>
      {renderStep()}
    </div>
  );
};

export default DemoForm;