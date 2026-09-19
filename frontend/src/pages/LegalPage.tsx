export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  return (
    <article className="container-shell section-pad max-w-4xl">
      <span className="eyebrow">Legal</span>
      <h1 className="heading mt-5">
        {privacy ? "Privacy Policy" : "Website Terms"}
      </h1>
      <p className="mt-5 text-sm text-slate-500">
        Last updated: 18 September 2026
      </p>
      <div className="prose-avnture mt-10">
        {privacy ? (
          <>
            <h2>Information we collect</h2>
            <p>
              When you submit a project enquiry, we collect the contact and
              project information you choose to provide. The website may also
              collect limited technical and analytics information when analytics
              is configured.
            </p>
            <h2>How information is used</h2>
            <p>
              Enquiry information is used to respond to your request, understand
              project requirements, maintain business records and protect the
              website from misuse.
            </p>
            <h2>Sharing and retention</h2>
            <p>
              Information is not sold. It may be processed by infrastructure
              providers needed to operate the website and is retained only as
              reasonably necessary for business, security and legal purposes.
            </p>
            <h2>Your choices</h2>
            <p>
              You may contact Avnture Technologies to request access, correction
              or deletion of information you submitted, subject to applicable
              obligations.
            </p>
          </>
        ) : (
          <>
            <h2>Website use</h2>
            <p>
              This website provides general information about Avnture
              Technologies and its services. Content may change as services and
              capabilities evolve.
            </p>
            <h2>Project discussions</h2>
            <p>
              Submitting an enquiry does not create a contract or guarantee
              project acceptance. Scope, timelines, fees and responsibilities
              are confirmed separately in writing.
            </p>
            <h2>Intellectual property</h2>
            <p>
              Website text, design and branding may not be reproduced for
              commercial use without permission. Third-party names and
              technologies remain the property of their respective owners.
            </p>
            <h2>Limitation</h2>
            <p>
              Reasonable care is taken to keep information accurate, but the
              website is provided without guarantees that every page will always
              be uninterrupted or error free.
            </p>
          </>
        )}
      </div>
    </article>
  );
}
