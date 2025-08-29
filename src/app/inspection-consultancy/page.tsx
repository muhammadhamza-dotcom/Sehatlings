"use client";
import { Check, FileText, X, CheckCircle, Mail, Building2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import validator from "validator";



// Zod validation schema for consultation form
const consultationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address')
    .refine((val) => {
      const hasAt = typeof val === 'string' && val.includes('@');
      const domain = hasAt ? val.split('@')[1] : '';
      if (!domain) return false;
      
      // Only reject obviously fake domains
      const fakeDomains = ['test.com', 'fake.com', 'example.com', 'sadff.com', 'asdf.com', 'temp.com'];
      if (fakeDomains.includes(domain)) return false;
      
      // Allow all major email providers
      const trustedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
      if (trustedDomains.includes(domain)) return true;
      
      // For other domains, just check basic structure
      const domainParts = domain.split('.');
      if (domainParts.length < 2) return false;
      
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2 || tld.length > 6) return false;
      
      return domain.length >= 4;
    }, 'Please enter a valid email address'),
  organization: z.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters')
    .transform(val => val.trim()),
  package: z.string()
    .min(1, 'Please select a package')
    .refine(val => ['Essential Compliance Check', 'Comprehensive Compliance Solution'].includes(val), 'Please select a valid package'),
  additional: z.string()
    .optional()
    .refine((val) => !val || val.length <= 500, 'Additional information must be less than 500 characters')
    .transform(val => val?.trim()),
});

type ConsultationData = {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  package: string;
  additional?: string;
};

export default function InspectionConsultancyPage() {
  useScrollAnimation();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationSubmitStatus, setConsultationSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // React Hook Form setup
  const consultationForm = useForm<ConsultationData>({
    resolver: zodResolver(consultationSchema),
    mode: 'onChange'
  });

  const { watch, formState: { errors } } = consultationForm;
  const watchedConsultationFields = watch();

  const onSubmitConsultation = async (data: ConsultationData) => {
    setConsultationSubmitStatus('loading');
    try {
      const subject = 'Lab Inspection Consultation Request';
      const body = `First Name: ${data.firstName}
Last Name: ${data.lastName}
Email: ${data.email}
Organization: ${data.organization}
Package: ${data.package || 'Not specified'}
Additional Information: ${data.additional || 'None provided'}`;

      const mailtoUrl = `mailto:sehatlings@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(mailtoUrl, '_blank');
      
      setConsultationSubmitStatus('success');
      consultationForm.reset();
      setTimeout(() => {
        setIsConsultationModalOpen(false);
        setConsultationSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error sending consultation request:', error);
      setConsultationSubmitStatus('error');
    }
  };


  return (
    <main key="inspection-consultancy">
      {/* Hero section with background image + maroon overlay */}
      <section className="relative h-[80vh] min-h-[640px] w-full overflow-hidden pt-20 md:pt-24 bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/medical_lab.webp')" }}
          aria-hidden
        />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div data-animate className="scroll-fade-up max-w-4xl text-center text-white">
            <span data-animate className="scroll-fade-up inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-4 bg-white/90 text-primary border border-white/60 shadow-sm backdrop-blur-sm" style={{transitionDelay: '0.2s'}}>
              Inspection Consultancy
            </span>
            <h1 data-animate className="scroll-fade-up text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{transitionDelay: '0.4s'}}>
              Achieve Excellence. <br />
              Secure Accreditation. <br />
              We Guide the Way.
            </h1>
            <p data-animate className="scroll-fade-up mt-5 text-base md:text-lg text-white/90 leading-relaxed" style={{transitionDelay: '0.6s'}}>
              Beyond our digital services, we streamline the path to licensing by serving as a third-party liaison for inspections, helping you secure accreditation with the official bodies.
            </p>
            <div data-animate className="scroll-fade-up mt-8 flex justify-center" style={{transitionDelay: '0.8s'}}>
              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="inline-flex items-center justify-center bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
              >
                Schedule Consultation
                <span className="ml-2">›</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* What We Offer */}
      <section key="what-we-offer" data-animate className="scroll-fade-up mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 data-animate className="scroll-fade-up text-3xl md:text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <p data-animate className="scroll-fade-up text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{transitionDelay: '0.2s'}}>
            At Sehatlings, we act as your trusted partner in achieving and maintaining the highest standards in healthcare delivery.
          </p>
        </div>

        <div 
          key="offer-cards"
          data-animate className="scroll-stagger mt-10 grid md:grid-cols-2 gap-8"
        >
          {/* Card 1 */}
          <div 
            className="rounded-2xl border border-gray-200 bg-white p-8 hover:transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            style={{transitionDelay: '0.1s'}}
          >
            <div 
              className="mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Strategic Consulting</h3>
            <p className="text-gray-700">
              We offer detailed consultation on key operational areas, including Laboratory, Radiology, Pharmacy, Infection Control Practices, and Waste Management. Our goal is to help you refine your processes and improve overall efficiency.
            </p>
          </div>

          {/* Card 2 */}
          <div 
            className="rounded-2xl border border-gray-200 bg-white p-8 hover:transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            style={{transitionDelay: '0.2s'}}
          >
            <div 
              className="mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Accreditation Pathway</h3>
            <p className="text-gray-700">
              Our team provides professional guidance to help you prepare the necessary documentation and meet the standards required for licensure and accreditation with the Sindh Healthcare Commission.
            </p>
          </div>

          {/* Card 3 */}
          <div 
            className="rounded-2xl border border-gray-200 bg-white p-8 hover:transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            style={{transitionDelay: '0.3s'}}
          >
            <div 
              className="mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Collaboration</h3>
            <p className="text-gray-700">
              We work alongside your staff, bringing a collaborative approach to quality improvement and compliance.
            </p>
          </div>

          {/* Card 4 */}
          <div 
            className="rounded-2xl border border-gray-200 bg-white p-8 hover:transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            style={{transitionDelay: '0.4s'}}
          >
            <div 
              className="mb-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Milestone Delivery</h3>
            <p className="text-gray-700">
              We are committed to an efficient and timely process. Our services are delivered on an agreed-upon timeline, ensuring a smooth path to your goals without unnecessary delays.
            </p>
          </div>
        </div>
      </section>

      <section key="service-models" data-animate className="scroll-fade-up mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 data-animate className="scroll-fade-up text-3xl md:text-4xl font-bold text-gray-900 mb-6">Service Models</h2>
          <p data-animate className="scroll-fade-up text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{transitionDelay: '0.2s'}}>
            Choose the service model that best fits your organization&apos;s needs and current compliance status.
          </p>
        </div>
        <div data-animate className="scroll-stagger mt-12 space-y-8">
          {/* Service 1 */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8 border-l-4 border-primary" style={{transitionDelay: '0.1s'}}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Essential Compliance Check</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Inspection & guidance of documents for a licensing and accreditation of lab, radiology, pharma, infections control, & waste management from SHC.
                </p>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 border-r-4 border-primary" style={{transitionDelay: '0.2s'}}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Compliance Solution</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  Develop the document from the scratch for a licensing & accreditation of lab, radiology, pharma, infections control, & waste management from SHC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modalPop"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-primary">Request a Consultation</h3>
              <button
                onClick={() => setIsConsultationModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Fill out the form below and our team will contact you within 24 hours.
            </p>

            <form onSubmit={consultationForm.handleSubmit(onSubmitConsultation)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="consultation-firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="consultation-firstName"
                    {...consultationForm.register('firstName')}
                    placeholder="John"
                    className={`mt-1 ${
                      errors.firstName 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : watchedConsultationFields.firstName && !errors.firstName
                        ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:border-primary focus:ring-primary'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {errors.firstName.message}
                    </p>
                  )}
                  {watchedConsultationFields.firstName && !errors.firstName && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Looks good!
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="consultation-lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="consultation-lastName"
                    {...consultationForm.register('lastName')}
                    placeholder="Doe"
                    className={`mt-1 ${
                      errors.lastName 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : watchedConsultationFields.lastName && !errors.lastName
                        ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:border-primary focus:ring-primary'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <X className="w-3 h-3" />
                      {errors.lastName.message}
                    </p>
                  )}
                  {watchedConsultationFields.lastName && !errors.lastName && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Looks good!
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="consultation-email">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="consultation-email"
                  type="email"
                  {...consultationForm.register('email')}
                  placeholder="john.doe@hospital.com"
                  className={`mt-1 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : watchedConsultationFields.email && !errors.email
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
                {watchedConsultationFields.email && !errors.email && (
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Valid email address!
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="consultation-organization">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  Organization <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="consultation-organization"
                  {...consultationForm.register('organization')}
                  placeholder="Hospital/Lab Name"
                  className={`mt-1 ${
                    errors.organization 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : watchedConsultationFields.organization && !errors.organization
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                />
                {errors.organization && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.organization.message}
                  </p>
                )}
                {watchedConsultationFields.organization && !errors.organization && (
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Organization name looks good!
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="consultation-package">
                  <Package className="w-4 h-4 inline mr-1" />
                  Package <span className="text-red-500">*</span>
                </Label>
                <select
                  id="consultation-package"
                  {...consultationForm.register('package')}
                  className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                    errors.package 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : watchedConsultationFields.package && !errors.package
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                >
                  <option value="">Select a package</option>
                  <option value="Essential Compliance Check">Essential Compliance Check</option>
                  <option value="Comprehensive Compliance Solution">Comprehensive Compliance Solution</option>
                </select>
                {errors.package && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.package.message}
                  </p>
                )}
                {watchedConsultationFields.package && !errors.package && (
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Package selected!
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="consultation-additional">Additional Information</Label>
                <Textarea
                  id="consultation-additional"
                  {...consultationForm.register('additional')}
                  placeholder="Tell us about your specific needs and current challenges..."
                  rows={4}
                  className={`mt-1 ${
                    errors.additional 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : watchedConsultationFields.additional && !errors.additional
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-primary focus:ring-primary'
                  }`}
                />
                {errors.additional && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.additional.message}
                  </p>
                )}
                {watchedConsultationFields.additional && !errors.additional && (
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Additional information added!
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="flex-1"
                  disabled={consultationSubmitStatus === 'loading'}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-white hover:bg-primary/90"
                  disabled={consultationSubmitStatus === 'loading'}
                >
                  {consultationSubmitStatus === 'loading' ? 'Sending...' : 
                   consultationSubmitStatus === 'success' ? 'Sent!' : 
                   'Request Consultation'}
                  {consultationSubmitStatus === 'idle' && <span className="ml-2">›</span>}
                  {consultationSubmitStatus === 'success' && <CheckCircle className="ml-2 w-4 h-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}









