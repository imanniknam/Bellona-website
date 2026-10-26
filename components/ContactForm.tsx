"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead } from "@/app/actions/contact";
import type { Dict, Locale } from "@/content/types";
import { localePath } from "@/lib/i18n";
import { legalPagesPublished } from "@/lib/site";
import { initialLeadState, MODEL_IDS, NEED_IDS, OFFER_IDS } from "@/lib/lead";
import { track } from "./Analytics";
import { RollText } from "./RollText";

type FormCopy = Dict["contact"]["form"];
type OfferOption = { id: string; name: string; need: string };

const inputCls =
  "min-h-12 w-full rounded-2xl border border-line-input bg-ink px-4 text-[15px] text-paper placeholder:text-muted-dark focus:border-orange focus:outline-none aria-[invalid=true]:border-orange";

/** Reads ?need=, ?model=, ?industry= and ?offer= so CTAs elsewhere can prefill the form. */
function usePrefill(offers: OfferOption[]) {
  const [prefill, setPrefill] = useState<{ needs: string[]; model?: string; industry?: string; offer?: string }>({ needs: [] });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const need = q.get("need");
    const model = q.get("model");
    const industry = q.get("industry");
    const offerId = q.get("offer");
    const offer = offerId && (OFFER_IDS as readonly string[]).includes(offerId) ? offers.find((o) => o.id === offerId) : undefined;
    // An offer implies its need when the link didn't set one.
    const needId = need ?? offer?.need ?? null;
    // Reading the URL once after mount; it can't be known during server render of a static page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefill({
      needs: needId && (NEED_IDS as readonly string[]).includes(needId) ? [needId] : [],
      model: model && (MODEL_IDS as readonly string[]).includes(model) ? model : undefined,
      industry: industry && /^[a-z-]{2,30}$/.test(industry) ? industry : undefined,
      offer: offer?.id,
    });
  }, [offers]);
  return prefill;
}

function stampNow(el: HTMLInputElement | null) {
  if (el && !el.value) el.value = String(Date.now());
}

export function ContactForm({
  locale,
  copy,
  defaultNeed,
  offers = [],
}: {
  locale: Locale;
  copy: FormCopy;
  defaultNeed?: string;
  offers?: OfferOption[];
}) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
  const prefill = usePrefill(offers);
  const selectedOffer = offers.find((o) => o.id === prefill.offer);
  const pathname = usePathname();
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === "idle") return;
    track(state.status === "success" ? "form_success" : state.status === "stored" ? "form_stored" : state.status === "invalid" ? "form_invalid" : "form_error", { locale });
    statusRef.current?.focus();
  }, [state, locale]);

  if (state.status === "success" || state.status === "stored") {
    return (
      <div className="card flex flex-col items-start gap-4 border border-line-dark bg-ink-2 p-8">
        <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-orange text-ink">
          <svg width="22" height="22" viewBox="0 0 24 24" className="fill-none stroke-current" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
        </span>
        <p ref={statusRef} tabIndex={-1} role="status" className="text-2xl font-bold outline-none">
          {state.status === "stored" ? copy.stored : copy.success}
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const selectedNeeds = v.needs ?? (prefill.needs.length ? prefill.needs : defaultNeed ? [defaultNeed] : []);
  const err = state.errors ?? {};

  return (
    <form
      // Re-mount after each server response so defaultValue/defaultChecked pick up returned values.
      key={`${state.attempt}-${prefill.needs.join()}-${prefill.offer ?? ""}`}
      action={action}
      onSubmit={() => track("form_submit", { locale })}
      aria-label={copy.label}
      noValidate
      className="card flex flex-col gap-6 border border-line-dark bg-ink-2 p-6 sm:p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Time-to-submit check for bots; stamped on mount (client only) so server and client HTML match. */}
      <input ref={stampNow} type="hidden" name="startedAt" defaultValue="" />
      <input type="hidden" name="page" value={pathname ?? ""} />
      {prefill.model && <input type="hidden" name="model" value={prefill.model} />}
      {prefill.industry && <input type="hidden" name="industry" value={prefill.industry} />}
      {selectedOffer && (
        <>
          <input type="hidden" name="offer" value={selectedOffer.id} />
          <p className="flex flex-wrap items-center gap-2 rounded-2xl bg-orange px-4 py-3 font-bold text-ink">
            <span className="text-sm">{copy.offerLabel}:</span>
            {selectedOffer.name}
          </p>
        </>
      )}

      {/* Honeypot: hidden from people and assistive tech, tempting for bots. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          {copy.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="flex flex-col gap-3" aria-describedby={err.needs ? "err-needs" : undefined}>
        <legend className="mb-3 text-base font-bold">{copy.needLegend}</legend>
        <div className="flex flex-wrap gap-2">
          {copy.needs.map((n) => (
            <label
              key={n.id}
              className="chip-check inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line-input px-4 text-sm font-semibold transition-colors has-checked:border-orange has-checked:bg-orange has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-orange"
            >
              <input
                type="checkbox"
                name="needs"
                value={n.id}
                defaultChecked={selectedNeeds.includes(n.id)}
                className="size-4 accent-ink focus:outline-none"
              />
              {n.label}
            </label>
          ))}
        </div>
        {err.needs && (
          <p id="err-needs" className="text-sm font-semibold text-orange-on-dark">
            {copy.errors.needs}
          </p>
        )}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-muted-dark">
          {copy.name}
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={copy.namePh}
            defaultValue={v.name}
            aria-invalid={err.name ? true : undefined}
            aria-describedby={err.name ? "err-name" : undefined}
            className={inputCls}
          />
          {err.name && (
            <span id="err-name" className="font-semibold text-orange-on-dark">
              {copy.errors.name}
            </span>
          )}
        </label>
        <label className="flex flex-col gap-2 text-sm text-muted-dark">
          {copy.email}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            placeholder={copy.emailPh}
            defaultValue={v.email}
            aria-invalid={err.email ? true : undefined}
            aria-describedby={err.email ? "err-email" : undefined}
            className={`${inputCls} rtl:text-end`}
          />
          {err.email && (
            <span id="err-email" className="font-semibold text-orange-on-dark">
              {copy.errors.email}
            </span>
          )}
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-muted-dark">
        {copy.company}
        <input name="company" type="text" autoComplete="organization" placeholder={copy.companyPh} defaultValue={v.company} className={inputCls} />
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted-dark">
        {copy.message}
        <textarea
          name="message"
          rows={4}
          maxLength={4000}
          placeholder={copy.messagePh}
          defaultValue={v.message}
          aria-invalid={err.message ? true : undefined}
          className={`${inputCls} min-h-28 py-3 leading-relaxed`}
        />
        {err.message && <span className="font-semibold text-orange-on-dark">{copy.errors.message}</span>}
      </label>

      {state.status === "error" && (
        <p ref={statusRef} tabIndex={-1} role="alert" className="rounded-2xl bg-orange px-4 py-3 font-semibold text-ink outline-none">
          {copy.error}
        </p>
      )}
      {state.status === "invalid" && (
        <p ref={statusRef} tabIndex={-1} role="alert" className="sr-only">
          {[err.needs && copy.errors.needs, err.name && copy.errors.name, err.email && copy.errors.email, err.message && copy.errors.message]
            .filter(Boolean)
            .join(" ")}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70">
        <RollText>{pending ? copy.sending : copy.submit}</RollText>
      </button>
      <p className="text-sm text-muted-dark">
        {copy.privacy}
        {legalPagesPublished && (
          <>
            {" "}
            <Link href={localePath(locale, "/privacy")} className="underline underline-offset-4 hover:text-paper">
              {copy.privacyLink}
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
