'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { FeedbackHeader } from '@/components/feedback/feedback-header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function FeedbackPage() {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <FeedbackHeader />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <Textarea
                placeholder="Tell us what you think about the form builder..."
                className="min-h-[150px]"
              />
              <Button>Send Feedback</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
