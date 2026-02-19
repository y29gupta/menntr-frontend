import CreateEvaluationContainer from '../../evaluation/CreateEvaluationContainer';
import { createAssignmentSchema } from './schema';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { assignmentApi } from '../assignment.service';

type Props = {
  mode?: 'create' | 'edit';
  editAssignmentId?: string;
};

export default function CreateAssignment({ mode = 'create', editAssignmentId }: Props) {
  return (
    // <CreateEvaluationContainer
    //   config={{
    //     entityLabel: 'Assignment',
    //     basePath: '/admin/assignment',
    //     schema: createAssignmentSchema,
    //     api: {
    //       create: assignmentApi.createAssignment,
    //       updateAudience: assignmentApi.updateAssignmentAudience,
    //       getQuestions: assignmentApi.getAssignmentQuestions,
    //       deleteQuestion: assignmentApi.deleteAssignmentQuestion,
    //       bulkUpload: assignmentApi.bulkUploadQuestions,
    //     },
    //     buildCreatePayload: (values) => ({
    //       title: values.title,
    //       description: values.description,
    //       category: values.category,
    //       assignment_type: values.assignmentType,
    //       due_date: values.due_date,
    //     }),
    //   }}
    //   Steps={{
    //     StepOne,
    //     StepTwo,
    //     StepThree,
    //     StepFour,
    //   }}
    // />
    <CreateEvaluationContainer
      mode={mode}
      editId={editAssignmentId}
      config={{
        entityLabel: 'Assignment',
        basePath: '/admin/assignment',
        schema: createAssignmentSchema,
        allowedQuestionTypes: ['mcq', 'coding', 'theory'],
        stepOneFields: ['title', 'category', 'assignmentType'],
        stepTwoFields: ['institutionCategory', 'department', 'batches'],

        api: {
          create: assignmentApi.createAssignment,
          update: assignmentApi.updateAssignment,
          getById: assignmentApi.getAssignmentById,
          updateAudience: assignmentApi.updateAssignmentAudience,
          getQuestions: assignmentApi.getAssignmentQuestions,
          deleteQuestion: assignmentApi.deleteAssignmentQuestion,
          bulkUpload: assignmentApi.bulkUploadQuestions,
        },

        buildCreatePayload: (values) => ({
          title: values.title,
          description: values.description,
          category: values.category,
          assignment_type: values.assignmentType,
        }),

        buildUpdatePayload: (values) => ({
          title: values.title,
          description: values.description,
          category: values.category,
          assignment_type: values.assignmentType,
        }),
      }}
      Steps={{
        StepOne,
        StepTwo,
        StepThree,
        StepFour,
      }}
    />
  );
}
