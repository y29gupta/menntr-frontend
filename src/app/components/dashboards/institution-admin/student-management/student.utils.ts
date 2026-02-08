export const mapStudentApiToFormValues = (apiData: any) => {
  return {
    // STEP 1 – basic
    firstName: apiData.basic_info.first_name ?? '',
    lastName: apiData.basic_info.last_name ?? '',
    email: apiData.basic_info.email ?? '',
    phone: apiData.basic_info.phone ?? '',
    gender: apiData.basic_info.gender ?? 'male',
    rollNumber: apiData.academic?.roll_number ?? '',

    // STEP 2 – academic
    program: apiData.academic?.category_role_id?.toString(),
    department: apiData.academic?.department_role_id?.toString(),
    batchId: apiData.academic?.batch_id,
    section: apiData.academic?.section_id?.toString(),

    // STEP 3 – enrollment
    admissionType: apiData.enrollment?.admission_type,
    enrollmentStatus: apiData.enrollment?.enrollment_status,
    joiningDate: apiData.enrollment?.joining_date
      ? new Date(apiData.enrollment.joining_date)
      : undefined,

    // STEP 4 – additional
    guardian_name: apiData.additional_info?.guardian_name,
    guardian_contact: apiData.additional_info?.guardian_contact,
    notes: apiData.additional_info?.notes,
  };
};
