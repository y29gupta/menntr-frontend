import AssessmentIcon from '@/app/components/icons/AssessmentIcon';
import AssessmentHeader from '../assessment/AssessmentHeader';
import EvaluationContainer from '../evaluation/EvaluationContainer';
import { PERMISSIONS } from '@/app/constants/permissions';
import { assessmentApi } from '../assessment/assessment.service';
import AssessmentFilters from '../assessment/AssessmentFilters';
import ActiveAssignments from './active/ActiveAssignments';
import DraftAssessments from '../assessment/drafts/DraftAssessments';
import { assignmentApi } from './assignment.service';
import DraftAssignments from './drafts/DraftAssignments';

export default function AssignmentContainer() {
  return (
    <EvaluationContainer
      basePath="/admin/assignment"
      queryKeyBase="assignments"
      api={{
        getList: assignmentApi.getAssignmentList,
      }}
      statuses={{
        active: 'ACTIVE',
        draft: 'DRAFT',
        completed: 'CLOSED',
      }}
      Header={(props) => (
        <AssessmentHeader
          {...props}
          title="Assignments"
          description="Create and manage coursework, homework and practice"
          createLabel="Create Assignment"
          Icon={AssessmentIcon}
          createPermission={PERMISSIONS.ASSESSMENT.ASSESSMENTS.CREATE}
        />
      )}
      Filters={(props) => <AssessmentFilters {...props} placeholder="Search for assignments" />}
      ActiveComponent={ActiveAssignments}
      DraftComponent={DraftAssignments}
      CompletedComponent={ActiveAssignments}
    />
  );
}
