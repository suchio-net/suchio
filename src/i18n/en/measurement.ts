const measurement = {
  title: "May we count this report visit?",
  explanation:
    "With your voluntary consent, Suchio records this visit for the business addressed to evaluate the postal campaign. We store the report code, day and consent evidence for 30 days, without an IP address in the statistics. A locally stored withdrawal key is valid for 30 days. The full report remains available without consent.",
  accept: "Allow this visit to be counted",
  decline: "Continue without counting",
  withdraw: "Withdraw consent and delete this count",
  accepted: "Your consent is stored. You can withdraw it here at any time.",
  declined: "This visit is not counted.",
  error: "The change could not be confirmed. Please try again. The report remains available.",
  privacy: "Measurement privacy information",
  preview: "Preview: this visit is not counted.",
  privacyTitle: "Optional measurement of audit visits",
  privacyBody:
    "The controller is Aleks Tsenov, Suchio, using the contact details above. Only after your explicit consent in the report do we record its code and the calendar day (UTC) to evaluate our postal campaign. The association with the addressed business may identify a person; these statistics are not anonymous. The legal bases are Article 6(1)(a) GDPR and, for the local withdrawal key, consent under section 25(1) TDDDG. Declining does not restrict the report. No cross-device recognition, tracking cookies, IP addresses or browser profiles are stored in the measurement database. A random key is used only for withdrawal and to avoid duplicate submission of this single confirmed visit. The locally stored key is valid for this report for 30 days; later visits are not automatically counted. An expired key is removed on the next access. The database stores its hash, report code, day, expiry and consent-text version. Withdraw with one click in the report in the same browser to delete the entry, or contact contact@suchio.net identifying the report, particularly after changing browsers. If individual attribution is unavailable, we can delete that report's entire measurement data. Withdrawal does not affect prior lawful processing. Records leave the active statistics after 30 days and are deleted by an hourly job, and also at campaign closure. Cloudflare supplies hosting and the database. Our own login protects administration. For authorised administrators, we store a hashed session key and login email for up to one hour and use a strictly necessary session cookie. Logout revokes the session; expired sessions are deleted hourly. The legal bases are Article 6(1)(f) GDPR (protecting internal statistics) and section 25(2)(2) TDDDG. IP addresses are processed temporarily to limit login attempts, not for visitor measurement. The database uses an EU jurisdiction; this does not mean all hosting and access data are processed exclusively in Europe. Security logs and time-limited backups follow provider retention periods; restored data are purged before reuse. Provider, transfer and rights information appears in this privacy policy. Only the authorised Suchio account sees the statistics. They trigger no automatic contact or decision. Confirmed visits do not identify unique readers or prove an enquiry.",
};

export default measurement;
