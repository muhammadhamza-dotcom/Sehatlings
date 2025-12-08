import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { put } from '@vercel/blob';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const doctorRegistrationSchema = z.object({
  fullName: z.string().min(2).max(50),
  pmdcNumber: z.string().regex(/^[0-9]{4,6}$/),
  pmdcExpiryDate: z.string().min(1),
  phoneNumber: z.string().min(1),
  emailAddress: z.string().min(1),
  currentlyPracticingAt: z.string().min(2).max(100),
  operatingLocation: z.string().min(2).max(100),
  availableForOnlineConsultation: z.enum(['yes', 'no']),
  availableDays: z.string(), // JSON string of array
  availableTime: z.string().min(1).max(100),
  openToFreeConsultations: z.enum(['yes', 'no']),
  age: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(23).max(80)),
  specialization: z.string().min(2).max(50),
  consentToCommission: z.string().transform(val => val === 'true').pipe(z.boolean()),
  preferSehatlingsOffice: z.enum(['yes', 'no']),
  consultationChargePerPatient: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(100).max(50000)),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const data = {
      fullName: formData.get('fullName') as string,
      pmdcNumber: formData.get('pmdcNumber') as string,
      pmdcExpiryDate: formData.get('pmdcExpiryDate') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      emailAddress: formData.get('emailAddress') as string,
      currentlyPracticingAt: formData.get('currentlyPracticingAt') as string,
      operatingLocation: formData.get('operatingLocation') as string,
      availableForOnlineConsultation: formData.get('availableForOnlineConsultation') as string,
      availableDays: formData.get('availableDays') as string,
      availableTime: formData.get('availableTime') as string,
      openToFreeConsultations: formData.get('openToFreeConsultations') as string,
      age: formData.get('age') as string,
      specialization: formData.get('specialization') as string,
      consentToCommission: formData.get('consentToCommission') as string,
      preferSehatlingsOffice: formData.get('preferSehatlingsOffice') as string,
      consultationChargePerPatient: formData.get('consultationChargePerPatient') as string,
    };

    // Extract files
    const frontPhoto = formData.get('frontPhoto') as File;
    const degreePdf = formData.get('degreePdf') as File;
    const pmdcCertificatePdf = formData.get('pmdcCertificatePdf') as File;

    // Validate form data
    const validatedData = doctorRegistrationSchema.parse(data);

    // Validate files
    if (!frontPhoto || frontPhoto.size === 0) {
      return NextResponse.json(
        { error: 'Front photo is required' },
        { status: 400 }
      );
    }
    if (!degreePdf || degreePdf.size === 0) {
      return NextResponse.json(
        { error: 'Degree PDF is required' },
        { status: 400 }
      );
    }
    if (!pmdcCertificatePdf || pmdcCertificatePdf.size === 0) {
      return NextResponse.json(
        { error: 'PMDC certificate PDF is required' },
        { status: 400 }
      );
    }

    // Check file size (5MB max for photo, 10MB for PDFs)
    if (frontPhoto.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }
    if (degreePdf.size > 10 * 1024 * 1024 || pmdcCertificatePdf.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'PDF files must be less than 10MB' },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(frontPhoto.type)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, and WebP files are allowed' },
        { status: 400 }
      );
    }
    if (degreePdf.type !== 'application/pdf' || pmdcCertificatePdf.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed for documents' },
        { status: 400 }
      );
    }

    // Parse available days
    let availableDays;
    try {
      availableDays = JSON.parse(validatedData.availableDays);
    } catch {
      return NextResponse.json(
        { error: 'Invalid available days format' },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = `DR-${Date.now()}`;

    // Upload files to Vercel Blob
    let photoUrl: string;
    let degreeUrl: string;
    let pmdcCertificateUrl: string;

    try {
      // Upload photo
      const photoBlob = await put(
        `doctor-registrations/${applicationId}/photo.${frontPhoto.name.split('.').pop()}`,
        frontPhoto,
        {
          access: 'public',
          addRandomSuffix: false,
          token: process.env.sehatlings_storage_READ_WRITE_TOKEN,
        }
      );
      photoUrl = photoBlob.url;

      // Upload degree PDF
      const degreeBlob = await put(
        `doctor-registrations/${applicationId}/degree.pdf`,
        degreePdf,
        {
          access: 'public',
          addRandomSuffix: false,
          token: process.env.sehatlings_storage_READ_WRITE_TOKEN,
        }
      );
      degreeUrl = degreeBlob.url;

      // Upload PMDC certificate PDF
      const pmdcBlob = await put(
        `doctor-registrations/${applicationId}/pmdc-certificate.pdf`,
        pmdcCertificatePdf,
        {
          access: 'public',
          addRandomSuffix: false,
          token: process.env.sehatlings_storage_READ_WRITE_TOKEN,
        }
      );
      pmdcCertificateUrl = pmdcBlob.url;
    } catch (blobError) {
      console.error('Failed to upload files to Vercel Blob:', blobError);
      return NextResponse.json(
        { error: 'Failed to upload files. Please try again.' },
        { status: 500 }
      );
    }

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5b0203; color: white; padding: 20px; text-align: center;">
          <h1>New Doctor Registration</h1>
          <p style="margin: 0; opacity: 0.9;">Application ID: ${applicationId}</p>
        </div>

        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Doctor Information</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Full Name:</strong>
            <div style="margin-top: 5px;">${validatedData.fullName}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">PMDC Number:</strong>
            <div style="margin-top: 5px;">${validatedData.pmdcNumber}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">PMDC Expiry Date:</strong>
            <div style="margin-top: 5px;">${validatedData.pmdcExpiryDate}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.emailAddress}">${validatedData.emailAddress}</a></div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Phone:</strong>
            <div style="margin-top: 5px;">${validatedData.phoneNumber}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Currently Practicing At:</strong>
            <div style="margin-top: 5px;">${validatedData.currentlyPracticingAt}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Operating Location:</strong>
            <div style="margin-top: 5px;">${validatedData.operatingLocation}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Age:</strong>
            <div style="margin-top: 5px;">${validatedData.age} years</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Specialization:</strong>
            <div style="margin-top: 5px;">${validatedData.specialization}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Available for Online Consultation:</strong>
            <div style="margin-top: 5px;">${validatedData.availableForOnlineConsultation === 'yes' ? 'Yes' : 'No'}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Available Days:</strong>
            <div style="margin-top: 5px;">${availableDays.join(', ')}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Available Time:</strong>
            <div style="margin-top: 5px;">${validatedData.availableTime}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Open to Free Consultations:</strong>
            <div style="margin-top: 5px;">${validatedData.openToFreeConsultations === 'yes' ? 'Yes (3 per month)' : 'No'}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Consultation Charge:</strong>
            <div style="margin-top: 5px;">PKR ${validatedData.consultationChargePerPatient}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Commission Consent (15%):</strong>
            <div style="margin-top: 5px;">${validatedData.consentToCommission ? 'Yes, agreed' : 'No'}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Prefer Sehatlings Office:</strong>
            <div style="margin-top: 5px;">${validatedData.preferSehatlingsOffice === 'yes' ? 'Yes' : 'No'}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Uploaded Documents:</strong>
            <div style="margin-top: 10px;">
              <a href="${photoUrl}" style="display: inline-block; padding: 8px 12px; background: #3182ce; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px; margin-bottom: 10px;">
                📷 View Photo
              </a>
              <a href="${degreeUrl}" style="display: inline-block; padding: 8px 12px; background: #3182ce; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px; margin-bottom: 10px;">
                📄 Degree Certificate
              </a>
              <a href="${pmdcCertificateUrl}" style="display: inline-block; padding: 8px 12px; background: #3182ce; color: white; text-decoration: none; border-radius: 4px; margin-bottom: 10px;">
                📄 PMDC Certificate
              </a>
            </div>
          </div>
        </div>

        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This registration was submitted on ${new Date().toLocaleString()}<br>
          Please review and contact the doctor within 48 hours.
        </div>
      </div>
    `;

    // Send email notification via Resend
    let emailStatus = 'success';
    let emailError = null;

    console.log('=== RESEND EMAIL SENDING ===');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);

    try {
      const result = await resend.emails.send({
        from: 'Doctor Registration <noreply@sehatlings.com>',
        to: ['engramhk@gmail.com'],
        subject: `New Doctor Registration: Dr. ${validatedData.fullName} - ${validatedData.specialization}`,
        html: emailHtml,
        replyTo: validatedData.emailAddress,
      });

      console.log('Resend Response:', result);

      if (result.data) {
        console.log('Email sent successfully via Resend! ID:', result.data.id);
      } else {
        emailStatus = 'failed';
        emailError = result.error || 'Resend failed to send email';
        console.error('Resend error:', result.error);
      }
    } catch (error) {
      emailStatus = 'failed';
      emailError = error;
      console.error('Failed to send notification email:', error);
      // Continue with success response even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Doctor registration submitted successfully',
        applicationId: applicationId,
        emailStatus: emailStatus,
        emailError: emailError ? String(emailError) : null,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Doctor registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add a GET method to check API status
export async function GET() {
  return NextResponse.json(
    {
      message: 'Doctor Registration API is running',
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}