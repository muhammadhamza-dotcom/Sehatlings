"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Upload,
  Loader2,
  CheckCircle,
  Stethoscope,
  FileText,
  X
} from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import validator from "validator";

const doctorRegistrationSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  pmdcNumber: z.string()
    .min(1, 'PMDC number is required')
    .regex(/^[0-9]{4,6}$/, 'PMDC number must be 4-6 digits')
    .refine((val) => {
      // Additional validation for PMDC format
      const num = parseInt(val);
      return num >= 1000 && num <= 999999; // Reasonable range for PMDC numbers
    }, 'Please enter a valid PMDC registration number')
    .transform(val => val.trim()),
  pmdcExpiryDate: z.string()
    .min(1, 'PMDC expiry date is required')
    .refine((val) => {
      const d = new Date(val);
      const today = new Date(new Date().toDateString());
      return !isNaN(d.getTime()) && d >= today;
    }, 'Expiry date must be a valid date in the future'),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
  emailAddress: z.string()
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
  currentlyPracticingAt: z.string()
    .min(2, 'Current practice location must be at least 2 characters')
    .max(100, 'Current practice location must be less than 100 characters')
    .transform(val => val.trim()),
  operatingLocation: z.string()
    .min(2, 'Operating location must be at least 2 characters')
    .max(100, 'Operating location must be less than 100 characters')
    .transform(val => val.trim()),
  availableForOnlineConsultation: z.enum(['yes', 'no']),
  availableDays: z.array(z.string()).min(1, 'Please select at least one available day'),
  availableTime: z.string()
    .min(1, 'Available time is required')
    .max(100, 'Available time must be less than 100 characters')
    .refine((val) => {
      // Basic time format validation (flexible but structured)
      const timePattern = /^(\d{1,2}:\d{2}\s*(AM|PM|am|pm)?)\s*-\s*(\d{1,2}:\d{2}\s*(AM|PM|am|pm)?)|(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})|24\/7|24x7|flexible|any time/i;
      return timePattern.test(val.trim());
    }, 'Please enter time in format "9:00 AM - 5:00 PM" or "9:00 - 17:00" or "Flexible"')
    .transform(val => val.trim()),
  openToFreeConsultations: z.enum(['yes', 'no']),
  age: z.number()
    .min(23, 'Age must be at least 23')
    .max(80, 'Age must be less than 80'),
  specialization: z.string()
    .min(2, 'Specialization must be at least 2 characters')
    .max(50, 'Specialization must be less than 50 characters')
    .transform(val => val.trim()),
  consentToCommission: z.boolean().refine(val => val === true, {
    message: 'Please check the terms and conditions checkbox to proceed'
  }),
  preferSehatlingsOffice: z.enum(['yes', 'no']),
  consultationChargePerPatient: z.number()
    .min(100, 'Consultation charge must be at least PKR 100')
    .max(50000, 'Consultation charge must be less than PKR 50,000'),
  frontPhoto: z.instanceof(File, { message: 'Please upload a front photo' })
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, and WebP files are allowed'
    ),
  degreePdf: z.instanceof(File, { message: 'Please upload your university degree (PDF)'} )
    .refine(file => file.size <= 10 * 1024 * 1024, 'Degree PDF must be less than 10MB')
    .refine(file => file.type === 'application/pdf', 'Only PDF files are allowed'),
  pmdcCertificatePdf: z.instanceof(File, { message: 'Please upload your PMDC certificate (PDF)'} )
    .refine(file => file.size <= 10 * 1024 * 1024, 'PMDC PDF must be less than 10MB')
    .refine(file => file.type === 'application/pdf', 'Only PDF files are allowed'),
});

type DoctorRegistrationData = z.infer<typeof doctorRegistrationSchema>;

interface DoctorRegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const SPECIALIZATIONS = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Psychiatrist',
  'Orthopedic Surgeon',
  'Gynecologist',
  'ENT Specialist',
  'Ophthalmologist',
  'Radiologist',
  'Anesthesiologist',
  'Urologist',
  'Gastroenterologist',
  'Endocrinologist',
  'Pulmonologist',
  'Rheumatologist',
  'Oncologist',
  'Other'
];

export default function DoctorRegistrationForm({ open, onOpenChange }: DoctorRegistrationFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDegreePdf, setSelectedDegreePdf] = useState<File | null>(null);
  const [selectedPmdcPdf, setSelectedPmdcPdf] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<DoctorRegistrationData>({
    resolver: zodResolver(doctorRegistrationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const watchedValues = watch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('frontPhoto', file, { shouldValidate: true });
    }
  };

  const handleDegreePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedDegreePdf(file);
      setValue('degreePdf', file, { shouldValidate: true });
    }
  };

  const handlePmdcPdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedPmdcPdf(file);
      setValue('pmdcCertificatePdf', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: DoctorRegistrationData) => {
    setSubmitStatus('loading');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'availableDays') {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch('/api/doctor-registration', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration result:', result);

        // Log email status
        if (result.emailStatus === 'failed') {
          console.error('EMAIL FAILED TO SEND:', result.emailError);
          alert(`Form submitted successfully but email failed to send. Error: ${result.emailError}`);
        } else {
          console.log('Email sent successfully!');
        }

        setSubmitStatus('success');
        reset();
        setSelectedFile(null);
        setSelectedDegreePdf(null);
        setSelectedPmdcPdf(null);
        setTimeout(() => {
          setSubmitStatus('idle');
          onOpenChange(false);
        }, 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-center sm:justify-between relative">
            <DialogTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              Doctor Registration
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute -right-4 sm:relative sm:right-auto p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="w-5 h-5 text-gray-400" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <DialogDescription>
            Join our telehealth platform and start providing online consultations to patients.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="mb-2 block">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className={`${errors.fullName ? "border-red-500" : watchedValues.fullName ? "border-green-500" : ""} pl-9`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* PMDC Number */}
              <div>
                <Label htmlFor="pmdcNumber" className="mb-2 block">Valid PMDC Number *</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="pmdcNumber"
                    {...register("pmdcNumber")}
                    placeholder="Enter your PMDC number"
                    className={`${errors.pmdcNumber ? "border-red-500" : watchedValues.pmdcNumber ? "border-green-500" : ""} pl-9`}
                  />
                </div>
                {errors.pmdcNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.pmdcNumber.message}</p>
                )}
              </div>

              {/* PMDC Expiry Date */}
              <div>
                <Label htmlFor="pmdcExpiryDate" className="mb-2 block">PMDC Expiry Date *</Label>
                <Input
                  id="pmdcExpiryDate"
                  type="date"
                  {...register("pmdcExpiryDate")}
                  className={`${errors.pmdcExpiryDate ? "border-red-500" : watchedValues.pmdcExpiryDate ? "border-green-500" : ""}`}
                />
                {errors.pmdcExpiryDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.pmdcExpiryDate.message}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="mb-2 block">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  placeholder="Enter your age"
                  className={`${errors.age ? "border-red-500" : watchedValues.age ? "border-green-500" : ""}`}
                />
                {errors.age && (
                  <p className="text-sm text-red-600 mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Specialization */}
              <div>
                <Label htmlFor="specialization" className="mb-2 block">Specialization *</Label>
                <div className="relative">
                  <select
                    id="specialization"
                    {...register("specialization")}
                    className={`flex h-10 w-full rounded-md border border-input bg-background pl-3 pr-10 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] appearance-none ${errors.specialization ? "border-red-500" : watchedValues.specialization ? "border-green-500" : ""}`}
                  >
                    <option value="">Select your specialization</option>
                    {SPECIALIZATIONS.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
                {errors.specialization && (
                  <p className="text-sm text-red-600 mt-1">{errors.specialization.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <Label htmlFor="emailAddress" className="mb-2 block">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="emailAddress"
                    type="email"
                    autoComplete="email"
                    {...register("emailAddress")}
                    placeholder="Enter your email address"
                    className={`${errors.emailAddress ? "border-red-500" : watchedValues.emailAddress ? "border-green-500" : ""} pl-9`}
                  />
                </div>
                {errors.emailAddress && (
                  <p className="text-sm text-red-600 mt-1">{errors.emailAddress.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="mb-2 block">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    {...register("phoneNumber")}
                    placeholder="Enter your phone number"
                    className={`${errors.phoneNumber ? "border-red-500" : watchedValues.phoneNumber ? "border-green-500" : ""} pl-9`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            {/* Currently Practicing At */}
            <div>
              <Label htmlFor="currentlyPracticingAt" className="mb-2 block">Currently Practicing At *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="currentlyPracticingAt"
                  {...register("currentlyPracticingAt")}
                  placeholder="Enter hospital, clinic, or practice name"
                  className={`${errors.currentlyPracticingAt ? "border-red-500" : watchedValues.currentlyPracticingAt ? "border-green-500" : ""} pl-9`}
                />
              </div>
              {errors.currentlyPracticingAt && (
                <p className="text-sm text-red-600 mt-1">{errors.currentlyPracticingAt.message}</p>
              )}
            </div>

            {/* Operating Location */}
            <div>
              <Label htmlFor="operatingLocation" className="mb-2 block">Operating Location *</Label>
              <Input
                id="operatingLocation"
                {...register("operatingLocation")}
                placeholder="City/Area you will operate or join from"
                className={`${errors.operatingLocation ? "border-red-500" : watchedValues.operatingLocation ? "border-green-500" : ""}`}
              />
              {errors.operatingLocation && (
                <p className="text-sm text-red-600 mt-1">{errors.operatingLocation.message}</p>
              )}
            </div>
          </div>

          {/* Availability Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Availability Information</h3>

            {/* Available for Online Consultation */}
            <div>
              <Label className="mb-2 block">Available for Online Consultation *</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("availableForOnlineConsultation")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("availableForOnlineConsultation")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.availableForOnlineConsultation && (
                <p className="text-sm text-red-600 mt-1">{errors.availableForOnlineConsultation.message}</p>
              )}
            </div>

            {/* Available Days */}
            <div>
              <Label className="mb-2 block">Available Days *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={day}
                      {...register("availableDays")}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                ))}
              </div>
              {errors.availableDays && (
                <p className="text-sm text-red-600 mt-1">{errors.availableDays.message}</p>
              )}
            </div>

            {/* Available Time */}
            <div>
              <Label htmlFor="availableTime" className="mb-2 block">Available Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="availableTime"
                  {...register("availableTime")}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                  className={`${errors.availableTime ? "border-red-500" : watchedValues.availableTime ? "border-green-500" : ""} pl-9`}
                />
              </div>
              {errors.availableTime && (
                <p className="text-sm text-red-600 mt-1">{errors.availableTime.message}</p>
              )}
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Financial Information</h3>

            {/* Free Consultations */}
            <div>
              <Label className="mb-2 block">Open to practice (3 free consultations a month) *</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("openToFreeConsultations")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("openToFreeConsultations")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.openToFreeConsultations && (
                <p className="text-sm text-red-600 mt-1">{errors.openToFreeConsultations.message}</p>
              )}
            </div>

            {/* Consultation Charge */}
            <div>
              <Label htmlFor="consultationChargePerPatient" className="mb-2 block">Consultation Charge Per Patient (PKR) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">PKR</span>
                <Input
                  id="consultationChargePerPatient"
                  type="number"
                  {...register("consultationChargePerPatient", { valueAsNumber: true })}
                  placeholder="Enter consultation fee in PKR"
                  className={`${errors.consultationChargePerPatient ? "border-red-500" : watchedValues.consultationChargePerPatient ? "border-green-500" : ""} pl-12`}
                />
              </div>
              {errors.consultationChargePerPatient && (
                <p className="text-sm text-red-600 mt-1">{errors.consultationChargePerPatient.message}</p>
              )}
            </div>


            {/* Sehatlings Telehealth Consultation Office Preference */}
            <div>
              <Label className="mb-2 block">Prefer Sehatlings telehealth consultation office? *</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register("preferSehatlingsOffice")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register("preferSehatlingsOffice")}
                    className="w-4 h-4 text-primary"
                  />
                  <span>No</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Setup includes a laptop with headset, reliable internet, and a local staff nurse to assist patients.
              </p>
              {errors.preferSehatlingsOffice && (
                <p className="text-sm text-red-600 mt-1">{errors.preferSehatlingsOffice.message}</p>
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Photo Upload</h3>

            <div>
              <Label htmlFor="frontPhoto" className="mb-2 block">Front Photo (No poses) *</Label>
              <div className="relative">
                <input
                  id="frontPhoto"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="frontPhoto"
                  className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                    errors.frontPhoto ? "border-red-500" : selectedFile ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : "Click to upload photo"}
                    </p>
                    <p className="text-xs text-gray-500">JPEG, PNG, WebP (max 5MB)</p>
                  </div>
                </label>
              </div>
              {errors.frontPhoto && (
                <p className="text-sm text-red-600 mt-1">{errors.frontPhoto.message}</p>
              )}
            </div>
          </div>

          {/* Documents Upload */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Documents</h3>

            {/* Degree PDF */}
            <div>
              <Label htmlFor="degreePdf" className="mb-2 block">Qualification (University Degree) PDF *</Label>
              <input
                id="degreePdf"
                type="file"
                accept="application/pdf"
                onChange={handleDegreePdfChange}
                className="hidden"
              />
              <label
                htmlFor="degreePdf"
                className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                  errors.degreePdf ? 'border-red-500' : selectedDegreePdf ? 'border-green-500' : 'border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedDegreePdf ? selectedDegreePdf.name : 'Click to upload degree (PDF)'}
                  </p>
                  <p className="text-xs text-gray-500">PDF (max 10MB)</p>
                </div>
              </label>
              {errors.degreePdf && (
                <p className="text-sm text-red-600 mt-1">{errors.degreePdf.message}</p>
              )}
            </div>

            {/* PMDC Certificate PDF */}
            <div>
              <Label htmlFor="pmdcCertificatePdf" className="mb-2 block">PMDC Certificate PDF *</Label>
              <input
                id="pmdcCertificatePdf"
                type="file"
                accept="application/pdf"
                onChange={handlePmdcPdfChange}
                className="hidden"
              />
              <label
                htmlFor="pmdcCertificatePdf"
                className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                  errors.pmdcCertificatePdf ? 'border-red-500' : selectedPmdcPdf ? 'border-green-500' : 'border-gray-300'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedPmdcPdf ? selectedPmdcPdf.name : 'Click to upload PMDC certificate (PDF)'}
                  </p>
                  <p className="text-xs text-gray-500">PDF (max 10MB)</p>
                </div>
              </label>
              {errors.pmdcCertificatePdf && (
                <p className="text-sm text-red-600 mt-1">{errors.pmdcCertificatePdf.message}</p>
              )}
            </div>
          </div>

          {/* Commission Consent */}
          <div>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register("consentToCommission")}
                className="w-4 h-4 mt-1 flex-shrink-0 accent-primary border-gray-300 rounded focus:ring-0 focus:outline-none"
              />
              <span className="text-sm text-gray-700">
                I agree that the company will charge 15% commission on my consultation fees *
              </span>
            </label>
            {errors.consentToCommission && (
              <p className="text-sm text-red-600 mt-1">{errors.consentToCommission.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitStatus === 'loading' || !isValid}
            className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {submitStatus === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting Registration...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Registration Submitted!
              </>
            ) : (
              'Submit Registration'
            )}
          </Button>
          <p className="text-xs text-black/50 text-center">
            Our team will verify your PMDC and reach out to discuss charges. Once the contract is accepted via email or signed, your name will be listed on our website.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}