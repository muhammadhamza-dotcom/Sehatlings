"use client";
import { Check, FileText, X, CheckCircle, Mail, Building2, Package, ArrowRight } from "lucide-react";
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
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setConsultationSubmitStatus('success');
        consultationForm.reset();
        setTimeout(() => {
          setIsConsultationModalOpen(false);
          setConsultationSubmitStatus('idle');
        }, 2000);
      } else {
        console.error('Consultation request error:', result);
        setConsultationSubmitStatus('error');
        setTimeout(() => setConsultationSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error sending consultation request:', error);
      setConsultationSubmitStatus('error');
      setTimeout(() => setConsultationSubmitStatus('idle'), 5000);
    }
  };


  return (
    <main key="inspection-consultancy">
      {/* Hero section - Professional Authority */}
      <section className="relative bg-cream min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with subtle opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
          style={{ backgroundImage: "url('/medical_lab.webp')" }}
          aria-hidden
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 sm:py-24 md:py-16 text-center">
          <div data-animate className="scroll-fade-up">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-widest mb-8 bg-maroon/10 text-maroon border border-maroon/20">
              INSPECTION CONSULTANCY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-charcoal mb-8 leading-tight">
              Achieve Excellence. <br />
              Secure Accreditation. <br />
              We Guide the Way.
            </h1>
            <p className="font-sans font-light text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Beyond our digital services, we streamline the path to licensing by serving as a third-party liaison for inspections, helping you secure accreditation with the official bodies.
            </p>
            <Button
              onClick={() => setIsConsultationModalOpen(true)}
              className="mx-auto bg-maroon hover:bg-maroon-dark text-cream px-6 py-3 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>


      {/* What We Offer - Professional Services Grid */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p data-animate className="scroll-fade-up text-xs font-medium uppercase tracking-widest text-maroon mb-4">
              OUR SERVICES
            </p>
            <h2 data-animate className="scroll-fade-up font-serif text-4xl md:text-5xl text-charcoal mb-6">
              What We Offer
            </h2>
            <p data-animate className="scroll-fade-up font-sans font-light text-lg text-gray-600 leading-relaxed">
              At Sehatlings, we act as your trusted partner in achieving and maintaining the highest standards in healthcare delivery.
            </p>
          </div>

          <div data-animate className="scroll-stagger grid md:grid-cols-2 gap-8">
            {/* Card 1 - Strategic Consulting */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300">
              <Check className="w-10 h-10 text-maroon mb-6" strokeWidth={2} />
              <h3 className="font-serif text-2xl text-charcoal mb-3">Strategic Consulting</h3>
              <p className="font-sans font-light text-gray-600 leading-relaxed">
                We offer detailed consultation on key operational areas, including Laboratory, Radiology, Pharmacy, Infection Control Practices, and Waste Management. Our goal is to help you refine your processes and improve overall efficiency.
              </p>
            </div>

            {/* Card 2 - Accreditation Pathway */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300">
              <Check className="w-10 h-10 text-maroon mb-6" strokeWidth={2} />
              <h3 className="font-serif text-2xl text-charcoal mb-3">Accreditation Pathway</h3>
              <p className="font-sans font-light text-gray-600 leading-relaxed">
                Our team provides professional guidance to help you prepare the necessary documentation and meet the standards required for licensure and accreditation with the Sindh Healthcare Commission.
              </p>
            </div>

            {/* Card 3 - Team Collaboration */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300">
              <Check className="w-10 h-10 text-maroon mb-6" strokeWidth={2} />
              <h3 className="font-serif text-2xl text-charcoal mb-3">Team Collaboration</h3>
              <p className="font-sans font-light text-gray-600 leading-relaxed">
                We work alongside your staff, bringing a collaborative approach to quality improvement and compliance.
              </p>
            </div>

            {/* Card 4 - Milestone Delivery */}
            <div className="bg-cream rounded-2xl border border-gray-200 p-8 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300">
              <Check className="w-10 h-10 text-maroon mb-6" strokeWidth={2} />
              <h3 className="font-serif text-2xl text-charcoal mb-3">Milestone Delivery</h3>
              <p className="font-sans font-light text-gray-600 leading-relaxed">
                We are committed to an efficient and timely process. Our services are delivered on an agreed-upon timeline, ensuring a smooth path to your goals without unnecessary delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Models - Compliance Packages */}
      <section className="bg-cream py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p data-animate className="scroll-fade-up text-xs font-medium uppercase tracking-widest text-maroon mb-4">
              CHOOSE YOUR PACKAGE
            </p>
            <h2 data-animate className="scroll-fade-up font-serif text-4xl md:text-5xl text-charcoal mb-6">
              Service Models
            </h2>
            <p data-animate className="scroll-fade-up font-sans font-light text-lg text-gray-600 leading-relaxed">
              Choose the service model that best fits your organization&apos;s needs and current compliance status.
            </p>
          </div>

          <div data-animate className="scroll-stagger grid md:grid-cols-2 gap-8">
            {/* Package 1 - Essential Compliance Check */}
            <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-maroon" strokeWidth={2} />
              </div>
              <h3 className="font-serif text-3xl text-charcoal mb-4">Essential Compliance Check</h3>
              <p className="font-sans font-light text-gray-600 leading-relaxed">
                Inspection & guidance of documents for a licensing and accreditation of lab, radiology, pharma, infections control, & waste management from SHC.
              </p>
            </div>

            {/* Package 2 - Comprehensive Compliance Solution */}
            <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-soft hover:shadow-dramatic hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-maroon/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-maroon" strokeWidth={2} />
              </div>
              <h3 className="font-serif text-3xl text-charcoal mb-4">Comprehensive Compliance Solution</h3>
              <p className="font-sans font-light text-gray-600 leading-relaxed">
                Develop the document from the scratch for a licensing & accreditation of lab, radiology, pharma, infections control, & waste management from SHC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-cream rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modalPop shadow-dramatic"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-3xl text-charcoal">Schedule Consultation</h3>
              <button
                onClick={() => setIsConsultationModalOpen(false)}
                className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-sans text-gray-600 mb-8">
              Fill out the form below and our team will contact you within 24 hours.
            </p>

            <form onSubmit={consultationForm.handleSubmit(onSubmitConsultation)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="consultation-firstName" className="text-maroon font-medium">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="consultation-firstName"
                    {...consultationForm.register('firstName')}
                    placeholder="John"
                    className={`mt-1 ${errors.firstName
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : watchedConsultationFields.firstName && !errors.firstName
                        ? 'border-maroon focus:border-maroon focus:ring-maroon/30'
                        : 'border-gray-200 focus:border-maroon focus:ring-maroon/30'
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
                  <Label htmlFor="consultation-lastName" className="text-maroon font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="consultation-lastName"
                    {...consultationForm.register('lastName')}
                    placeholder="Doe"
                    className={`mt-1 ${errors.lastName
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : watchedConsultationFields.lastName && !errors.lastName
                        ? 'border-maroon focus:border-maroon focus:ring-maroon/30'
                        : 'border-gray-200 focus:border-maroon focus:ring-maroon/30'
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
                <Label htmlFor="consultation-email" className="text-maroon font-medium">
                  <Mail className="w-4 h-4 inline mr-1 text-gray-400" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="consultation-email"
                  type="email"
                  {...consultationForm.register('email')}
                  placeholder="john.doe@hospital.com"
                  className={`mt-1 ${errors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : watchedConsultationFields.email && !errors.email
                      ? 'border-maroon focus:border-maroon focus:ring-maroon/30'
                      : 'border-gray-200 focus:border-maroon focus:ring-maroon/30'
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
                <Label htmlFor="consultation-organization" className="text-maroon font-medium">
                  <Building2 className="w-4 h-4 inline mr-1 text-gray-400" />
                  Organization <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="consultation-organization"
                  {...consultationForm.register('organization')}
                  placeholder="Hospital/Lab Name"
                  className={`mt-1 ${errors.organization
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : watchedConsultationFields.organization && !errors.organization
                      ? 'border-maroon focus:border-maroon focus:ring-maroon/30'
                      : 'border-gray-200 focus:border-maroon focus:ring-maroon/30'
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
                <Label htmlFor="consultation-package" className="text-maroon font-medium">
                  <Package className="w-4 h-4 inline mr-1 text-gray-400" />
                  Package <span className="text-red-500">*</span>
                </Label>
                <select
                  id="consultation-package"
                  {...consultationForm.register('package')}
                  className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.package
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : watchedConsultationFields.package && !errors.package
                      ? 'border-maroon focus:border-maroon focus:ring-maroon/30'
                      : 'border-gray-200 focus:border-maroon focus:ring-maroon/30'
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
                <Label htmlFor="consultation-additional" className="text-maroon font-medium">Additional Information</Label>
                <Textarea
                  id="consultation-additional"
                  {...consultationForm.register('additional')}
                  placeholder="Tell us about your specific needs and current challenges..."
                  rows={4}
                  className={`mt-1 resize-none ${errors.additional
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : watchedConsultationFields.additional && !errors.additional
                      ? 'border-maroon focus:border-maroon focus:ring-maroon/30'
                      : 'border-gray-200 focus:border-maroon focus:ring-maroon/30'
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
                  className="flex-1 rounded-full"
                  disabled={consultationSubmitStatus === 'loading'}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-maroon hover:bg-maroon-dark text-cream rounded-full font-semibold disabled:opacity-50"
                  disabled={consultationSubmitStatus === 'loading'}
                >
                  {consultationSubmitStatus === 'loading' ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin mr-2"></span>
                      Sending...
                    </>
                  ) : consultationSubmitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Sent!
                    </>
                  ) : (
                    'Request Consultation'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}









