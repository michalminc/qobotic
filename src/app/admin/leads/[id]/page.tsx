import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LEAD_TYPE_LABEL } from "@/lib/admin-ui";
import LeadActions from "./lead-actions";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { robot: { select: { name: true, slug: true } } },
  });
  if (!lead) notFound();

  return (
    <div className="p-8 max-w-[800px]">
      <Link href="/admin/leads" className="text-[13px] text-[#86868b] hover:text-[#1d1d1f]">← Back to leads</Link>
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#1d1d1f] mt-1 mb-1">{lead.email}</h1>
      <p className="text-[13px] text-[#86868b] mb-6">
        Received {new Date(lead.createdAt).toLocaleString()}
        {lead.contactedAt && ` · contacted ${new Date(lead.contactedAt).toLocaleString()}`}
      </p>

      <div className="bg-white rounded-2xl border border-black/[0.06] p-6 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="Type" value={`${LEAD_TYPE_LABEL[lead.type] || lead.type} inquiry`} />
          <Field label="Status" value={lead.status} />
          <Field label="Robot" value={lead.robot ? lead.robot.name : "—"} />
          <Field label="Source" value={lead.source || "—"} />
          <Field label="Name" value={lead.name || "—"} />
          <Field label="Company" value={lead.company || "—"} />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-2">Message</p>
          <div className="p-4 rounded-xl bg-[#f5f5f7] text-[14px] text-[#1d1d1f] whitespace-pre-wrap">
            {lead.message || <span className="italic text-[#86868b]">No message</span>}
          </div>
        </div>
      </div>

      <LeadActions id={lead.id} status={lead.status} notes={lead.notes || ""} />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-1">{label}</p>
      <p className="text-[14px] text-[#1d1d1f]">{value}</p>
    </div>
  );
}
