import { Interruption } from './proctoring.types';

type Props = {
  interruptions: Interruption[];
};

export function InterruptionsSection({ interruptions }: Props) {
  if (interruptions.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-[#101828]">Interruptions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interruptions.map((interruption) => (
            <div key={interruption.id} className="rounded-xl border border-[#EAECF0] p-4 space-y-3">
              <h4 className="text-sm font-medium text-[#101828]">{interruption.title}</h4>

              <div className="space-y-2">
                {interruption.events.map((event: any, idx: any) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-sm font-medium text-[#904BFF] min-w-[45px]">
                      {event.time}
                    </span>
                    <span className="text-sm text-[#667085]">{event.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-[#DBE3E9]" />
    </>
  );
}
