import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

const Section = ({ title, children }) => (
    <section className="space-y-3">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
            {children}
        </div>
    </section>
);

const Terms = () => (
    <div className="subscription-scroll h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">

        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
                <Link
                    to="/"
                    className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                    <ArrowLeft size={15} />
                    Back
                </Link>
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Terms &amp; Conditions</span>
            </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

            {/* Hero */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-md shrink-0">
                    <FileText size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Terms &amp; Conditions</h1>
                    <p className="text-sm text-gray-400 mt-1">Last updated: May 14, 2025</p>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Please read these Terms &amp; Conditions carefully before using ReviewPilot. By accessing or using
                our service, you agree to be bound by these terms. If you do not agree, please discontinue use immediately.
            </p>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <Section title="1. Acceptance of Terms">
                <p>
                    By creating an account or using any part of the ReviewPilot platform ("Service"), you agree to
                    these Terms &amp; Conditions and our Privacy Policy. These terms apply to all visitors, users, and
                    others who access or use the Service.
                </p>
                <p>
                    If you are using the Service on behalf of a business or organization, you represent that you have
                    authority to bind that entity to these terms.
                </p>
            </Section>

            <Section title="2. Description of Service">
                <p>
                    ReviewPilot is a SaaS platform that helps businesses manage, respond to, and analyze customer
                    reviews across multiple platforms using AI-powered tools. Features include review syncing, AI reply
                    generation, bulk posting, and analytics dashboards.
                </p>
                <p>
                    We reserve the right to modify, suspend, or discontinue any part of the Service at any time with
                    reasonable notice.
                </p>
            </Section>

            <Section title="3. Account Registration &amp; Security">
                <p>
                    You must provide accurate and complete information when creating an account. You are responsible
                    for maintaining the confidentiality of your login credentials and for all activity that occurs
                    under your account.
                </p>
                <p>
                    Notify us immediately at support@reviewpilot.io if you suspect any unauthorized access to your
                    account. We are not liable for losses arising from unauthorized use of your credentials.
                </p>
                <p>
                    You must be at least 18 years of age or the legal age of majority in your jurisdiction to create
                    an account.
                </p>
            </Section>

            <Section title="4. Subscription &amp; Billing">
                <p>
                    ReviewPilot offers free and paid subscription plans. Paid plans are billed in advance on a monthly
                    or yearly basis. All prices are displayed in USD.
                </p>
                <p>
                    Payments are processed securely by Stripe. By providing payment information, you authorize us to
                    charge the applicable fees to your payment method.
                </p>
                <p>
                    Yearly subscriptions are billed as a single annual payment. You may cancel at any time; however,
                    we do not provide pro-rated refunds for unused periods unless required by applicable law.
                </p>
                <p>
                    Lifetime plans are one-time purchases that grant access to the specified tier for the lifetime of
                    the product. "Lifetime" refers to the active life of the ReviewPilot service, not the user's
                    lifetime.
                </p>
                <p>
                    We reserve the right to change pricing with 30 days' notice. Price changes will not affect your
                    current billing cycle.
                </p>
            </Section>

            <Section title="5. Promotional Offers &amp; Discounted Pricing">
                <p>
                    From time to time, ReviewPilot may offer promotional or discounted pricing on its subscription
                    plans. These offers are intended for first-time subscribers and are valid for a single use per account.
                </p>
                <p>
                    <strong className="text-gray-800 dark:text-gray-200">Once a promotional offer has been availed and the subscription is subsequently cancelled
                    — whether voluntarily or due to non-payment — that offer cannot be redeemed again on the same
                    account.</strong> Any re-subscription will be subject to the standard pricing applicable at
                    the time of re-subscription.
                </p>
                <p>
                    This restriction applies regardless of the reason for cancellation, the plan tier, or the
                    billing period originally subscribed to. Promotional pricing is non-transferable and cannot be
                    combined with other offers.
                </p>
                <p>
                    If you believe your account has been incorrectly restricted from a promotional offer, please
                    contact us at support@reviewpilot.io for review on a case-by-case basis.
                </p>
            </Section>

            <Section title="6. Use of AI Features">
                <p>
                    AI-generated reply suggestions are provided as a convenience. You are solely responsible for
                    reviewing, editing, and approving any content before it is posted publicly on review platforms.
                </p>
                <p>
                    ReviewPilot does not guarantee the accuracy, appropriateness, or quality of AI-generated content.
                    Do not post AI replies that contain false, misleading, or harmful information.
                </p>
                <p>
                    Usage of AI features is subject to monthly limits depending on your plan. Unused AI credits do
                    not roll over to the next billing period.
                </p>
            </Section>

            <Section title="7. Prohibited Uses">
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Post fake, fabricated, or misleading reviews on any platform.</li>
                    <li>Violate the terms of service of any connected review platform (e.g., Google, Yelp).</li>
                    <li>Engage in spamming, phishing, or any form of unsolicited communication.</li>
                    <li>Attempt to reverse-engineer, scrape, or exploit the Service in any unauthorized manner.</li>
                    <li>Upload or transmit viruses, malware, or any harmful code.</li>
                    <li>Use the Service for any unlawful purpose or in violation of any applicable regulations.</li>
                </ul>
            </Section>

            <Section title="8. Intellectual Property">
                <p>
                    All content, logos, trademarks, and intellectual property related to ReviewPilot are owned by
                    or licensed to us and may not be used without our prior written permission.
                </p>
                <p>
                    You retain ownership of the review data and business content you bring into the platform.
                    By using the Service, you grant ReviewPilot a limited, non-exclusive license to process your
                    data solely for the purpose of delivering the Service to you.
                </p>
            </Section>

            <Section title="9. Data &amp; Privacy">
                <p>
                    We collect and process data in accordance with our Privacy Policy. By using the Service, you
                    consent to the collection and use of your information as described therein.
                </p>
                <p>
                    We implement industry-standard security measures to protect your data. However, no transmission
                    over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p>
                    We will never sell your personal data to third parties.
                </p>
            </Section>

            <Section title="10. Termination">
                <p>
                    You may cancel your account at any time from your subscription settings. Upon cancellation,
                    your access to paid features will continue until the end of the current billing period.
                </p>
                <p>
                    We reserve the right to suspend or terminate your account immediately if you violate these
                    Terms, engage in fraudulent activity, or if required by law.
                </p>
                <p>
                    Upon termination, your data may be deleted after a retention period of 30 days.
                </p>
            </Section>

            <Section title="11. Disclaimer &amp; Limitation of Liability">
                <p>
                    The Service is provided "as is" and "as available" without warranties of any kind, either express
                    or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of
                    harmful components.
                </p>
                <p>
                    To the maximum extent permitted by law, ReviewPilot shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages arising from your use of the Service,
                    even if we have been advised of the possibility of such damages.
                </p>
                <p>
                    Our total liability to you for any claim arising from use of the Service shall not exceed the
                    amount you paid us in the 3 months preceding the claim.
                </p>
            </Section>

            <Section title="12. Changes to These Terms">
                <p>
                    We may update these Terms &amp; Conditions from time to time. When we do, we will revise the
                    "Last updated" date at the top of this page and may notify you via email or an in-app notice.
                </p>
                <p>
                    Continued use of the Service after changes are posted constitutes your acceptance of the
                    revised terms.
                </p>
            </Section>

            <Section title="13. Governing Law">
                <p>
                    These Terms shall be governed by and construed in accordance with applicable laws. Any disputes
                    arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts
                    in the applicable jurisdiction.
                </p>
            </Section>

            <Section title="14. Contact Us">
                <p>
                    If you have any questions about these Terms &amp; Conditions, please contact us at:
                </p>
                <p className="font-medium text-indigo-600 dark:text-indigo-400">support@reviewpilot.io</p>
            </Section>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <p className="text-xs text-gray-400 text-center pb-4">
                &copy; {new Date().getFullYear()} ReviewPilot. All rights reserved.
            </p>
        </div>
    </div>
);

export default Terms;
