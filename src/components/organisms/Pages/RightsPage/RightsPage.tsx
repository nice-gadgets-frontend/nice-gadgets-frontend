import { useState, useEffect } from 'react';

export const RightsPage = () => {
  console.warn(
    "Disclaimer: No actual lawyers were harmed in the making of this 'Rights' page. Some legal jargon may be purely for aesthetic purposes.",
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen px-4 sm:px-6 xl:px-0 xl:max-w-[1136px] mx-auto">
      <h1 className="text-5xl text-white font-[Mont-Bold] text-center mb-12 animate-fade-in-down">
        Legal Information
      </h1>

      <div className="bg-[#20233d] shadow-xl rounded-lg p-8 mb-12">
        {loading ?
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-[#3a3f5a] w-2/3 rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-full rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-3/4 rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-1/2 rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-1/3 rounded"></div>
          </div>
        : <>
            <h2 className="text-4xl text-white font-bold mb-6 border-b-2 border-primary pb-3">
              Terms & Conditions
            </h2>
            <div className="space-y-6 text-[#cdced2] text-lg leading-relaxed">
              <p>
                Welcome to Nice Gadgets! By accessing and using our website, you
                agree to comply with and be bound by the following terms and
                conditions of use. Please review them carefully.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                1. Acceptance of Terms:
              </h3>
              <p>
                These Terms and Conditions (&quot;Terms&quot;) govern your
                access to and use of theNice Gadgets website (the
                &quot;Site&quot;) and all its content, services, and products.
                By accessing or using any part of the Site, you agree to become
                bound by the Terms and Conditions of this agreement. If you do
                not agree to all the Terms and Conditions, then you may not
                access the Site or use any services. Your use of the Site
                constitutes your acceptance of these Terms.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                2. Products and Services:
              </h3>
              <p>
                Nice Gadgets offers a wide range of mobile phones, accessories,
                and related services. While we strive for accuracy, product
                descriptions, images, and pricing displayed on the Site are
                subject to change without notice. We make every effort to ensure
                the accuracy of information, but errors may occur. All products
                are subject to availability. We reserve the right to modify or
                discontinue any product or service at any time without notice.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                3. User Accounts:
              </h3>
              <p>
                To access certain features of the Site, you may be required to
                create an account. You are solely responsible for maintaining
                the confidentiality of your account information, including your
                password, and for all activities that occur under your account.
                You agree to notify Nice Gadgets immediately of any unauthorized
                use of your account or any other breach of security. We reserve
                the right to refuse service, terminate accounts, remove or edit
                content, or cancel orders in our sole discretion.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                4. Orders and Payments:
              </h3>
              <p>
                All orders placed through the Site are subject to acceptance by
                Nice Gadgets. We may, at our sole discretion, limit or cancel
                quantities purchased per person, per household, or per order. In
                the event that we make a change to or cancel an order, we may
                attempt to notify you by contacting the e-mail and/or billing
                address/phone number provided at the time the order was made.
                Prices for our products are subject to change without notice. We
                accept various payment methods as indicated on the Site. You
                agree to provide current, complete, and accurate purchase and
                account information for all purchases made at our store.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                5. Shipping and Returns:
              </h3>
              <p>
                Please refer to our dedicated Shipping Policy and Return Policy
                pages for detailed information regarding delivery times,
                shipping costs, return procedures, and refund eligibility. By
                placing an order, you agree to these policies.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                6. Intellectual Property:
              </h3>
              <p>
                The content, features, and functionality of the Nice Gadgets
                website (including but not limited to all information ,
                software, text, displays, images, video, and audio, and the
                design, selection, and arrangement thereof) are owned by Nice
                Gadgets, its licensors, or other providers of such material and
                are protected by international copyright, trademark, patent,
                trade secret, and other intellectual property or proprietary
                rights laws. You may not reproduce, distribute, modify, create
                derivative works of, publicly display, publicly perform,
                republish, download, store, or transmit any of the material on
                our Site, except as generally permitted for personal,
                non-commercial use.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                7. Disclaimers and Limitation of Liability:
              </h3>
              <p>
                The Site and its content are provided on an &quot;as is&quot;
                and &quot;as available&quot; basis without any warranties of any
                kind, either express or implied. Nice Gadgets does not warrant
                that the Site will be uninterrupted, error-free, or free of
                viruses or other harmful components. To the fullest extent
                permitted by law, Nice Gadgets disclaims all warranties, express
                or implied, including but not limited to implied warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement.
                <br />
                <br />
                In no event will Nice Gadgets, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from (I)
                your access to or use of or inability to access or use the
                Service; (II) any conduct or content of any third party on the
                Service; (III) any content obtained from the Service; and (IV)
                unauthorized access, use or alteration of your transmissions or
                content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have
                been informed of the possibility of such damage.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                8. Governing Law:
              </h3>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws of Ukraine, without regard to its conflict of law
                provisions. Any legal action or proceeding arising under these
                Terms will be brought exclusively in the courts located in
                Ukraine, and you hereby irrevocably consent to the personal
                jurisdiction and venue therein.
              </p>

              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                9. Changes to Terms:
              </h3>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days&apos; notice prior to any
                new terms taking effect. What constitutes a material change will
                be determined at our sole discretion. By continuing to access or
                use our Site after those revisions become effective, you agree
                to be bound by the revised terms.
              </p>
            </div>
          </>
        }
      </div>

      <div className="bg-[#20233d] shadow-xl rounded-lg p-8">
        {loading ?
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-[#3a3f5a] w-2/3 rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-full rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-3/4 rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-1/2 rounded"></div>
            <div className="h-6 bg-[#3a3f5a] w-1/3 rounded"></div>
          </div>
        : <>
            <h2 className="text-4xl text-white font-[Mont-Bold] mb-6 border-b-2 border-primary pb-3">
              Privacy Policy
            </h2>
            <div className="space-y-6 text-[#cdced2] text-lg leading-relaxed">
              <p>
                Your privacy is of utmost importance to Nice Gadgets. This
                Privacy Policy describes how we collect, use, and disclose
                information from and about you when you visit our website, make
                purchases, or interact with our services.
              </p>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                1. Information We Collect:
              </h3>
              <p>
                We collect various types of information for different purposes
                to provide and improve our services to you.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Personal Data:</strong> While using our Site, we may
                  ask you to provide us with certain personally identifiable
                  information that can be used to contact or identify you
                  (&quot;Personal Data&quot;). This may include, but is not
                  limited to: name, email address, phone number, billing
                  address, shipping address, payment information (e.g., credit
                  card details), and purchase history.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may also collect information
                  that your browser sends whenever you visit our Site or when
                  you access the Service by or through a mobile device
                  (&quot;Usage Data&quot;). This Usage Data may include
                  information such as your computer&apos;s Internet Protocol
                  address (e.g., IP address), browser type, browser version, the
                  pages of our Site that you visit, the time and date of your
                  visit, the time spent on those pages, unique device
                  identifiers, and other diagnostic data.
                </li>
                <li>
                  <strong>Tracking & Cookies Data:</strong> We use cookies and
                  similar tracking technologies to track the activity on our
                  Site and hold certain information. Cookies are files with a
                  small amount of data which may include an anonymous unique
                  identifier. You can instruct your browser to refuse all
                  cookies or to indicate when a cookie is being sent. However,
                  if you do not accept cookies, you may not be able to use some
                  portions of our Site.
                </li>
              </ul>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                2. How We Use Your Information:
              </h3>
              <p>Nice Gadgets uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>
                  To allow you to participate in interactive features of our
                  Service when you choose to do so.
                </li>
                <li>To provide customer care and support.</li>
                <li>To process your orders and manage your account.</li>
                <li>
                  To provide you with news, special offers, and general
                  information about other goods, services, and events which we
                  offer that are similar to those that you have already
                  purchased or enquired about unless you have opted not to
                  receive such information.
                </li>
                <li>To monitor the usage of our Service.</li>
                <li>To detect, prevent, and address technical issues.</li>
              </ul>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                3. Disclosure of Your Information:
              </h3>
              <p>
                We may share your Personal Data with third parties in the
                following situations:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Service Providers:</strong> We may employ third-party
                  companies and individuals to facilitate our Service
                  (&quot;Service Providers&quot;), to provide the Service on our
                  behalf, to perform Service-related services, or to assist us
                  in analyzing how our Service is used. These third parties have
                  access to your Personal Data only to perform these tasks on
                  our behalf and are obligated not to disclose or use it for any
                  other purpose.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If Nice Gadgets is
                  involved in a merger, acquisition, or asset sale, your
                  Personal Data may be transferred.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your
                  Personal Data in the good faith belief that such action is
                  necessary to:
                  <ul className="list-circle list-inside ml-5 mt-1 space-y-1">
                    <li>Comply with a legal obligation.</li>
                    <li>
                      Protect and defend the rights or property of Nice Gadgets.
                    </li>
                    <li>
                      Prevent or investigate possible wrongdoing in connection
                      with the Service.
                    </li>
                    <li>
                      Protect the personal safety of users of the Service or the
                      public.
                    </li>
                    <li>Protect against legal liability.</li>
                  </ul>
                </li>
              </ul>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                4. Security of Data:
              </h3>
              <p>
                The security of your data is important to us, but remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </p>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                5. Your Data Protection Rights:
              </h3>
              <p>
                Depending on your location, you may have certain data protection
                rights. These include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  The right to access, update or delete the information we have
                  on you.
                </li>
                <li>
                  The right to object to our processing of your Personal Data.
                </li>
                <li>
                  The right to request that we restrict the processing of your
                  personal information.
                </li>
                <li>The right to data portability.</li>
                <li>
                  The right to withdraw consent at any time where Nice Gadgets
                  relied on your consent to process your personal information.
                </li>
              </ul>
              To exercise any of these rights, please contact us.
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                6. Children&apos;s Privacy:
              </h3>
              <p>
                Our Service does not address anyone under the age of 18
                (&quot;Children&quot;). We do not knowingly collect personally
                identifiable information from anyone under the age of 18. If you
                are a parent or guardian and you are aware that your Children
                has provided us with Personal Data, please contact us. If we
                become aware that we have collected Personal Data from children
                without verification of parental consent, we take steps to
                remove that information from our servers.
              </p>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                7. Links to Other Sites:
              </h3>
              <p>
                Our Service may contain links to other sites that are not
                operated by us. If you click on a third-party link, you will be
                directed to that third party&apos;s site. We strongly advise you
                to review the Privacy Policy of every site you visit. We have no
                control over and assume no responsibility for the content,
                privacy policies, or practices of any third-party sites or
                services.
              </p>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                8. Changes to This Privacy Policy:
              </h3>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. We will let you know via email and/or a prominent
                notice on our Service, prior to the change becoming effective
                and update the &quot;effective date&quot; at the top of this
                Privacy Policy. You are advised to review this Privacy Policy
                periodically for any changes. Changes to this Privacy Policy are
                effective when they are posted on this page.
              </p>
              <h3 className="text-2xl font-[Mont-SemiBold] mt-8 mb-4">
                9. Contact Us:
              </h3>
              <p>
                If you have any questions about this Privacy Policy or our Terms
                & Conditions, please contact us:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  By email:{' '}
                  <a
                    href="mailto:legal@nicegadgets.com"
                    className="text-blue-400 hover:underline"
                  >
                    legal@nicegadgets.com
                  </a>
                </li>
                <li>
                  By visiting this page on our website:{' '}
                  <a
                    href="contacts"
                    className="text-blue-400 hover:underline"
                  >
                    Contact Us
                  </a>
                </li>
                <li>By phone number: +1 (555) 555-5555</li>
              </ul>
            </div>
          </>
        }
      </div>
    </div>
  );
};
