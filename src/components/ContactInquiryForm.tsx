'use client'

import { trackPendoEvent } from '@/lib/pendo'

function hasValue(data: FormData, name: string) {
  let value = data.get(name)
  return typeof value === 'string' && value.trim() !== ''
}

export function ContactInquiryForm({
  children,
}: {
  children: React.ReactNode
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // `submit` only fires after the browser's constraint validation passes.
    // The form has no delivery backend yet and keeps its native submission;
    // once a delivery handler exists, call this from its success callback.
    let data = new FormData(event.currentTarget)
    let budget = data.get('budget')

    // Lead-qualification signals only. Never send name, email, phone or
    // message text.
    trackPendoEvent('contact_inquiry_submitted', {
      budget: typeof budget === 'string' ? budget : 'none',
      has_company: hasValue(data, 'company'),
      has_phone: hasValue(data, 'phone'),
      has_message: hasValue(data, 'message'),
    })
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}
