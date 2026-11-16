import React, { useState } from 'react';
import { BarrierReport } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ThumbsUp, 
  Search, 
  Plus, 
} from 'lucide-react';

interface CommunityFeedProps {
  barriers: BarrierReport[];
  selectedBarrierId: string | null;
  onSelectBarrier: (barrierId: string) => void;
  onConfirmBarrier: (barrierId: string) => void;
  onResolveBarrier: (barrierId: string) => void;
  onOpenReportModal: () => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  barriers,
  selectedBarrierId,
  onSelectBarrier,
  onConfirmBarrier,
  onResolveBarrier,
  onOpenReportModal,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredBarriers = barriers.filter((b) => {
    if (filterStatus === 'urgent') {
      if (b.status === 'resolved' || b.severity !== 'urgent') return false;
    } else if (filterStatus !== 'all' && b.status !== filterStatus) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.locationName.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#1D1D1F] text-[17px] tracking-tight">
              Civic Barrier Feed
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/[0.05] text-[#6E6E73]">
              {barriers.length} reports
            </span>
          </div>
          <p className="text-[13px] text-[#6E6E73] mt-0.5">
            Real-time audits from commuters, transit staff, and wheelchair riders
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white text-[13px] font-medium shadow-[0_2px_8px_rgba(0,113,227,0.22)] apple-press transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span>Post Report</span>
        </button>
      </div>

      {/* Filter Segmented Control & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Apple Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-[12px] bg-[#F5F5F7] p-1 rounded-full border border-black/[0.04]">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all apple-press ${
              filterStatus === 'all'
                ? 'bg-white text-[#1D1D1F] shadow-[0_1px_4px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            All ({barriers.length})
          </button>
          <button
            onClick={() => setFilterStatus('urgent')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all apple-press ${
              filterStatus === 'urgent'
                ? 'bg-[#FF3B30] text-white shadow-[0_1px_4px_rgba(255,59,48,0.30)] font-semibold'
                : 'text-[#6E6E73] hover:text-[#FF3B30]'
            }`}
          >
            Urgent ({barriers.filter(b => b.severity === 'urgent' && b.status !== 'resolved').length})
          </button>
          <button
            onClick={() => setFilterStatus('unverified')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all apple-press ${
              filterStatus === 'unverified'
                ? 'bg-[#FF9F0A] text-white shadow-[0_1px_4px_rgba(255,159,10,0.30)] font-semibold'
                : 'text-[#6E6E73] hover:text-[#FF9F0A]'
            }`}
          >
            Unverified ({barriers.filter(b => b.status === 'unverified').length})
          </button>
          <button
            onClick={() => setFilterStatus('verified')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all apple-press ${
              filterStatus === 'verified'
                ? 'bg-[#34C759] text-white shadow-[0_1px_4px_rgba(52,199,89,0.30)] font-semibold'
                : 'text-[#6E6E73] hover:text-[#34C759]'
            }`}
          >
            Verified ({barriers.filter(b => b.status === 'verified').length})
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all apple-press ${
              filterStatus === 'resolved'
                ? 'bg-[#8E8E93] text-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            Resolved ({barriers.filter(b => b.status === 'resolved').length})
          </button>
        </div>

        {/* Minimal Search */}
        <div className="relative min-w-[190px]">
          <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={1.75} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-full text-[13px] bg-[#F5F5F7] border border-black/[0.06] rounded-full pl-8 pr-3.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0071E3] text-[#1D1D1F] placeholder:text-[#8E8E93]"
          />
        </div>
      </div>

      {/* Reports Feed List */}
      <div className="divide-y divide-black/[0.06] max-h-[400px] overflow-y-auto pr-1">
        {filteredBarriers.length === 0 ? (
          <div className="py-9 text-center text-[#8E8E93] text-[13px]">
            <CheckCircle2 className="w-7 h-7 text-[#34C759] mx-auto mb-1.5 opacity-80" strokeWidth={1.75} />
            <p className="font-semibold text-[#1D1D1F]">No barriers in this category</p>
            <p className="mt-0.5 text-[#6E6E73]">The selected filter is clear of obstacles.</p>
          </div>
        ) : (
          filteredBarriers.map((barrier) => {
            const isSelected = barrier.id === selectedBarrierId;
            const isUrgent = barrier.severity === 'urgent';
            const isResolved = barrier.status === 'resolved';

            return (
              <div
                key={barrier.id}
                onClick={() => onSelectBarrier(barrier.id)}
                className={`py-3.5 px-3 rounded-[18px] transition-all cursor-pointer apple-press ${
                  isSelected ? 'bg-[#0071E3]/[0.06] border border-[#0071E3]/20' : 'hover:bg-[#F5F5F7]/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      isResolved
                        ? 'bg-black/[0.05] text-[#6E6E73]'
                        : isUrgent
                        ? 'bg-[#FF3B30]/[0.12] text-[#FF3B30]'
                        : barrier.status === 'verified'
                        ? 'bg-[#34C759]/[0.12] text-[#34C759]'
                        : 'bg-[#FF9F0A]/[0.14] text-[#D97706]'
                    }`}>
                      {barrier.status.toUpperCase()}
                    </span>

                    <span className="text-[12px] font-medium text-[#6E6E73] capitalize">
                      {barrier.type.replace('-', ' ')}
                    </span>
                  </div>

                  <span className="text-[12px] text-[#86868B] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#8E8E93]" strokeWidth={1.75} />
                    {barrier.reportedAt}
                  </span>
                </div>

                <h4 className="text-[14px] font-semibold text-[#1D1D1F] mt-1 tracking-tight leading-snug">
                  {barrier.title}
                </h4>
                <p className="text-[12px] text-[#6E6E73] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#8E8E93]" strokeWidth={1.75} />
                  {barrier.locationName}
                </p>

                <p className="text-[13px] text-[#6E6E73] mt-1.5 line-clamp-2 leading-relaxed">
                  {barrier.description}
                </p>

                {/* Card Actions */}
                <div className="mt-3 flex items-center justify-between text-[12px] pt-2 border-t border-black/[0.04]">
                  <span className="text-[11px] text-[#86868B]">
                    Audited by {barrier.reportedBy}
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {barrier.status !== 'resolved' ? (
                      <>
                        <button
                          onClick={() => onConfirmBarrier(barrier.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0071E3]/[0.08] hover:bg-[#0071E3]/[0.16] text-[#0071E3] text-[11px] font-semibold apple-press transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" strokeWidth={1.75} />
                          Confirm ({barrier.upvotes})
                        </button>
                        <button
                          onClick={() => onResolveBarrier(barrier.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#6E6E73] hover:text-[#1D1D1F] text-[11px] font-medium apple-press transition-colors"
                        >
                          Clear
                        </button>
                      </>
                    ) : (
                      <span className="text-[11px] text-[#34C759] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" strokeWidth={1.75} />
                        Cleared
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
