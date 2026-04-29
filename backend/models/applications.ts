import sql from "./db.ts";

export async function checkReferenceNumber(referenceNumber: string) {
  return await sql`
    SELECT *
    FROM applications
    WHERE reference_number = ${referenceNumber}
  `;
}
export async function getApplications() {
  return await sql`
        SELECT *
        FROM applications
        ORDER BY reference_number ASC
    `;
}
export async function registerApplication(
  user_id: number,
  reference_number: number,
  relationship_type: string,
  consulate: string,
  abh_offices: string,
  case_type: string,
  status: string,
  frv_email_sent_date: string,
  appointment_confirmation_date: string,
  visa_appointment_date: string,
  visa_issued_date: string,
  visa_start_date: string,
  duration_months: string,
  insurance_submitted_date: string,
  passport_collected_date: string,
  visa_type: string,
  language: string,
  abh_document_submitted_date: string,
) {
  const newApplication = await sql`
    INSERT INTO applications 
      (user_id, reference_number, relationship_type, consulate, abh_offices, case_type, status, frv_email_sent_date, appointment_confirmation_date, visa_appointment_date, visa_issued_date, visa_start_date, duration_months, insurance_submitted_date, passport_collected_date, created_at,visa_type, language, abh_document_submitted_date)
    VALUES 
      (${user_id}, ${reference_number}, ${relationship_type}, ${consulate}, ${abh_offices},${case_type}, ${status}, ${frv_email_sent_date}, ${appointment_confirmation_date}, ${visa_appointment_date}, ${visa_issued_date}, ${visa_start_date}, ${duration_months}, ${insurance_submitted_date}, ${passport_collected_date}, NOW(), ${visa_type}, ${language}, ${abh_document_submitted_date})
    RETURNING id
  `;

  return newApplication[0];
}

export async function updateApplication(id: number, data: any) {
  const updatedApplication = await sql`
    UPDATE applications SET
      reference_number = ${data.reference_number},
      relationship_type = ${data.relationship_type},
      visa_type = ${data.visa_type},
      language = ${data.language},
      consulate = ${data.consulate},
      abh_offices = ${data.abh_offices},
      abh_document_submitted_date = ${data.abh_document_submitted_date},
      case_type = ${data.case_type},
      status = ${data.status},
      frv_email_sent_date = ${data.frv_email_sent_date},
      appointment_confirmation_date = ${data.appointment_confirmation_date},
      visa_appointment_date = ${data.visa_appointment_date},
      visa_issued_date = ${data.visa_issued_date},
      visa_start_date = ${data.visa_start_date},
      duration_months = ${data.duration_months},
      insurance_submitted_date = ${data.insurance_submitted_date},
      passport_collected_date = ${data.passport_collected_date}
    WHERE id = ${id}
    RETURNING *
  `;

  return updatedApplication[0];
}

export async function getApplicationByUser(user_id: number) {
  const application = await sql`
        SELECT *
        FROM applications
        WHERE user_id = ${user_id}
    `;

  return application[0] ?? {};
}

export async function applicationsSummary() {
  // Total applications
  const totalResult = await sql`SELECT COUNT(*) AS total FROM applications`;
  const totalApplications = Number(totalResult[0].total);

  // Consulate counts
  const consulateResult = await sql`
      SELECT consulate, COUNT(*) AS count
      FROM applications
      GROUP BY consulate
    `;

  // Convert result to object: { Karachi: 22, Islamabad: 15 }
  const consulateCounts: any = {};
  consulateResult.forEach((row) => {
    consulateCounts[row.consulate] = Number(row.count);
  });
  return {
    totalApplications,
    consulateCounts,
  };
}
