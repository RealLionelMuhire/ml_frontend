import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const TermsAndConditions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography
        variant="h2"
        fontWeight="900"
        gutterBottom
        align="center"
        under
      >
        TERMS & CONDITIONS
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        COMPLIANCE REQUIREMENTS
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        {/* Replace this text with your actual terms and conditions */}
        <p>
          You undertake to complete in full ML Corporate Services Ltd’s Client
          Acceptance Form, and you undertake to inform ML Corporate Services Ltd
          immediately of any changes to the information provided to ML Corporate
          Services Ltd. You declare that the information given by you by virtue
          of the present document is true and accurate and you will complete and
          sign the annexes if any. Any failure to the above undertaking enables
          ML Corporate Services Ltd to refuse onboarding you as a client. You
          agree that ML Corporate Services Ltd’s failure to insist upon strict
          compliance with this Client Acceptance Form or its Terms and
          Conditions will not constitute or be considered a waiver by ML
          Corporate Services Ltd of any of its rights or any of your
          obligations. If any provisions of the present document deemed to be
          invalid, illegal, void or unenforceable, by reason of any law, rule,
          administrative or judicial decision, such determination will not
          affect the validity of the remaining provisions of the Client
          Acceptance Form and Terms and Conditions.
        </p>
        <p>
          You undertake to provide a copy of all due diligence documents,
          customer files, account files, business correspondence, transactions
          and information related to the business relationship that the entity
          to be set up will be engaged into; the information and documentation
          to be provided will include the following: the name and address of the
          customers, beneficial owner and underlying principal; the date of the
          transaction; the currency and amount of the transaction; the source
          and destination of funds including full remitter details
          (instructions, forms of authority); the nature of the transaction; the
          account name and number or other information by which it can be
          identified; the details of the counterparty, including account details
          and; the sale and purchase agreements as well as service agreements.
        </p>
        <p>
          You further undertake to provide a copy of all supporting documents
          and agreements that justify payments and transfer to be made in the
          bank accounts of the entity to be set up, whenever a transaction takes
          place therein and that the supporting documents are true, correct and
          complete in every respect.
        </p>
        <p>
          You agree to indemnify ML Corporate Services Ltd against any fraud,
          loss, undertaking, or damage suffered by ML Corporate Services Ltd due
          to your providing of any incorrect information or failure to
          communicate any change in particulars/information or provide true and
          updated documents.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        COLLECTION OF PERSONAL DATA
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          To perform our contractual obligations, ML Corporate Services Ltd
          collects, processes, and stores personal data relating to you,
          including but not limited to, sensitive personal data. ML Corporate
          Services Ltd treat personal data we collect according to our client
          on-boarding process and as part of provision of our services as
          private and confidential and we abide by all data protection laws as
          may be applicable, including the Rwandan Data Protection Law No.
          058/2021 of 13 October 2021. For the purpose of the services to be
          offered, you herein freely consent to the collection and processing of
          your personal data by ML Corporate Services Ltd, in relation to the
          basic requirements for the effectiveness of valid legal consent. You
          hereby agree that ML Corporate Services Ltd, in the furtherance of a
          mutual beneficial business relationship, be authorized to use your
          data in a proper and lawful manner, and in compliance with all
          applicable laws and regulations. Henceforth, you acknowledge and
          understand that ML Corporate Services Ltd shall use its best
          endeavours in deploying security measures and mechanisms to ensure the
          protection of your personal data.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        LEGAL CAPACITY
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          You recognise being fully capable or authorized to engage in a
          contractual relationship with ML Corporate Services Ltd in order to
          utilize the services provided by the ML Corporate Services Ltd. You
          hereby confirm that you will furnish a list of the authorized
          signatories or representatives to deal or provide instructions to ML
          Corporate Services Ltd. ML Corporate Services Ltd is authorized to
          honour the instructions of any such authorized signatories or
          representatives. Any such list of authorised persons when submitted
          with ML Corporate Services Ltd will be binding on you until notice to
          the contrary has been given to ML Corporate Services Ltd and receipt
          of such notice duly acknowledged by ML Corporate Services Ltd.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        DECLARATION OF SOURCES OF FUNDS
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          For the purpose of the services to be offered, you declare and warrant
          that the moneys and/or other assets introduced (including the funds to
          be injected in the entity to be set up from time to time, either
          directly or indirectly through another entity) to the entity to be set
          up;
          <ol type="a">
            <li>
              <p></p>
              Are derived from legitimate sources and you are legally entitled
              to deal with such moneys and/or assets.
            </li>
            <li>
              <p>
                that the moneys and/or other assets are free from any
                encumbrance or restraint imposed by any court or any third
                party;
              </p>
            </li>
            <li>
              <p>
                that the introduction and delivery of moneys and/or other assets
                is not calculated to carry out any illegal purpose;
              </p>
            </li>
            <li>
              <p>
                that you are not insolvent and have never been declared
                bankrupt;
              </p>
            </li>
            <li>
              <p>
                that following any transfer to the entity, you will not be
                rendered insolvent;
              </p>
            </li>
            <li>
              <p>
                that it is your intention to remain solvent and be able to
                settle all reasonably anticipated debts as and when they fall
                due.
              </p>
            </li>
          </ol>
        </p>
        <p>
          You declare that the moneys and/or other assets now or to be
          introduced to the entity to be set up do not emanate from any activity
          which is unlawful and specifically that none of the assets were
          derived from any of the activities characterised as criminal by any
          applicable legislation against money laundering. You acknowledge that
          if ML Corporate Services Ltd at any time discovers that the
          declaration made herein is untrue, ML Corporate Services Ltd will
          disclose full details of its dealings with you, including names,
          addresses, telephone and facsimile numbers and electronic mail
          addresses to the appropriate government authorities.
        </p>
        <p>
          You confirm that if you are required by any lawful authority to
          determine the source of funds and/or assets, you will provide ML
          Corporate Services Ltd with any necessary documentation, information
          and explanations to establish that the said source of funds is from a
          lawful activity, and that funds and/or assets are free from any
          encumbrance or restraint imposed by any court or any third party.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        REPRESENTATIONS
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          You hereby confirm that neither you nor any of your officers
          (including directors or shareholders) of the entity to be set up have
          (a) at any time been convicted of any offence involving fraud, or
          other dishonesty, or any other offence such as an economic offence or
          money laundering or been subject to penalties for tax evasion (whether
          or not in Rwanda); (b) been convicted in any Court of Law for a
          criminal offence or penalised or sanctioned, or is currently or has
          ever been under investigation for professional negligence or
          malpractice by any Regulatory Authority in any country and (c) at any
          time in the previous 7 years been involved in an entity, which has
          criticised, censured, disciplined, suspended, or fined by any
          regulatory body in Rwanda or by any regulatory body in any other
          jurisdiction.
        </p>
        <p>
          You affirm that you have never been a defendant to any legal or
          administrative proceedings in which it has been alleged that you were
          declared bankrupt or dishonest or in breach of any laws, regulations
          or rules (by whatever authority made) in relation to dealings in real
          property, securities of any description or investments of any kind.
        </p>
        <p>
          Should any of the three representations made above be not correct,
          please inform ML Corporate Services Ltd.
        </p>
        <p>
          You hereby undertake to inform ML Corporate Services Ltd upon your
          becoming aware of any potential or actual claim or demand or the
          commencement of any action, suit or proceeding against the entity to
          be set up.
        </p>
        <p>
          You will use your best endeavours to ensure that, so far as you are
          aware and are lawfully entitled to do so, the entity and its affairs
          are conducted in a proper and lawful manner and in compliance with all
          applicable laws and regulations.
        </p>
        <p>
          You acknowledge and understand that ML Corporate Services Ltd is not
          giving you any fiscal or exchange control advice. You declare that you
          have taken appropriate tax and other professional advice with regard
          to the introduction or delivery of the moneys and/or other assets
          introduced to the entity to be set up. You confirm that the said
          entity will make all necessary disclosures required by law to the
          relevant authorities and if applicable the appropriate agencies which
          regulate the trading of securities. If appropriate disclosures are not
          made, you will advise ML Corporate Services Ltd accordingly, whereupon
          ML Corporate Services Ltd will advise you that it will cease to act
          for you forthwith.
        </p>
        <p>
          You undertake to ensure that the entity to be set up is kept in
          sufficient funds to honour liabilities as and when they fall due.
        </p>
        <p>
          You will not alienate, assign, sell, pledge or otherwise dispose of
          any of your interest in the entity to be set up without prior written
          notice to ML Corporate Services Ltd in that regard.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        CONFLICT OF INTERESTS
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          You agree that ML Corporate Services Ltd may, in the provision of the
          services to you and your entity, engage in any transaction with any of
          their related entities, without having to account for any resultant
          benefit or advantage.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        EMAIL INDEMNITY
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          In relation to instructions, purporting to come from you in relation
          your entity to be set up and administered by ML Corporate Services
          Ltd, by way of telephone messages, facsimile messages, email messages
          and not bearing an original signature and/or by way of other means of
          communication through both instant messaging and voice chat, including
          but not limited to Skype, Google mail, Yahoo mail (the
          “Instructions”), and without requiring any prerequisite written
          confirmation prior to acting thereon, you formally and unreservedly
          confirm that:
          <ol>
            <li>
              <p>
                You are fully aware of all the risks inherent to Instructions
                including, but not limited to:
              </p>
            </li>
            <ol type="a">
              <li>
                <p>
                  Instructions given through impersonated email addresses,
                  numbers and signatures; and
                </p>
              </li>
              <li>
                <p>
                  Instructions being erroneously misinterpreted or understood or
                  addressed to the wrong recipients and thereby becoming known
                  to third parties.
                </p>
              </li>
            </ol>
            <p>
              You hereby confirm your acceptance of all risks and
              unconditionally agree that all risks will be fully borne by you.
              You unreservedly accept that ML Corporate Services Ltd will bear
              no responsibility or liability whatsoever and will not be liable
              for any losses or damages in relation thereto.
            </p>
            <li>
              <p>
                ML Corporate Services Ltd is hereby unconditionally requested
                and authorised to act upon any Instructions which it, in its
                sole and absolute discretion, reasonably believe to emanate from
                you or otherwise appear to comply with the Services Agreement.
              </p>
              <p>
                ML Corporate Services Ltd will not be liable for having acted in
                good faith upon Instructions purporting to come from you but
                which, is subsequently discovered to, or may, emanate from
                unauthorised individuals or in any other circumstances
                whatsoever.
              </p>
            </li>
            <li>
              <p>
                You acknowledge that ML Corporate Services Ltd will not be under
                any duty or obligation to verify the authenticity of any
                Instructions and the identity of the person or persons sending
                any Instructions purportedly made on your behalf or the
                genuineness of the said Instructions. Any transactions processed
                pursuant to any Instructions will be binding to all intents and
                purposes upon you.
              </p>
            </li>
            <li>
              <p>
                You undertake to keep ML Corporate Services Ltd indemnified at
                all times against, and to save ML Corporate Services Ltd
                harmless from all actions, proceedings, claims, loss, damage,
                costs and expenses which may be brought against ML Corporate
                Services Ltd or suffered or incurred by ML Corporate Services
                Ltd and which will have arisen either directly or indirectly,
                out of or in connection with ML Corporate Services Ltd accepting
                and acting upon Instructions purporting to emanate from you,
                whether or not same are confirmed in writing by you.
              </p>
            </li>
            <li>
              You agree that:
              <ol type="i">
                <li>
                  <p>
                    ML Corporate Services Ltd will notify you in writing, within
                    14 days, by registered mail, at your address as stated in
                    the services agreement entered into between ML Corporate
                    Services Ltd and you, of any claim made against ML Corporate
                    Services Ltd on the obligations indemnified against.
                  </p>
                </li>
                <li>
                  <p>
                    ML Corporate Services Ltd reserves the right to vary from
                    time to time, according to its policy, the terms and
                    conditions governing the sending Instructions and to notify
                    you by such means as it will think fit. Any such variation
                    will become effective upon 14 days after the sending of such
                    notification.
                  </p>
                </li>
                <li>
                  <p>
                    The rights, duties, privileges and obligations mentioned in
                    the present document will inure to your benefit and your
                    personal representatives and successors and will bind ML
                    Corporate Services Ltd and its successors.
                  </p>
                </li>
              </ol>
            </li>
          </ol>
        </p>
        <p>
          This authorisation is given by you to whom it may concern within ML
          Corporate Services Ltd and is valid until formal written revocation
          from you. Such revocation will not affect any rights of ML Corporate
          Services Ltd in respect of any circumstance arising before the
          revocation.
        </p>
        <p>
          {" "}
          Email address/es from which instructions will be sent to ML Corporate
          Services Ltd:
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        LIABILITY
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          You have requested one or more of the officers or employees of ML
          Corporate Services Ltd to act as director (Director) and/or officer
          (Officer) of the entity to be set up. In consideration of ML Corporate
          Services Ltd or some one or more of its directors, officers or
          employees (Employee) and their successors, servants, agents, heirs and
          personal representatives having agreed to act as Director and/or
          Officer of the entity as requested by you, you hereby covenant with ML
          Corporate Services Ltd and as a separate covenant with every such
          Director, Officer and Employee of ML Corporate Services Ltd that you
          at all times hereafter will indemnify and hold them harmless and keep
          them indemnified and hold harmless against all actions, suits,
          proceedings, claims, demands, costs, damages, interest and expenses
          whatsoever (including but without prejudice to the generality of the
          foregoing, all liabilities for all taxes, duties or other fiscal
          liabilities of whatsoever nature and whatsoever arising and whether
          legally enforceable or not) which may be incurred or become payable by
          them in respect of or arising out of:
          <ol type="i">
            <li>
              <p>
                Their accepting or holding any office or acting as Director
                and/or Officer or otherwise of the entity;
              </p>
            </li>
            <li>
              <p>
                Any payment, advance, act or thing done, omitted or neglected to
                be done as a Director or Officer of the entity at the request of
                or with the prior approval of or ratified by you or your agents;
              </p>
            </li>
            <li>
              <p>
                Anything done, omitted or neglected to be done pursuant to a
                power of attorney issued by the entity at the request or with
                the prior approval of or ratified by you or your agents;
              </p>
            </li>
            <li>
              <p>
                Anything done, omitted or neglected to be done pursuant to a
                power of attorney issued by the entity at the request or with
                the prior approval of or ratified by you or your agents;
              </p>
            </li>
            <li>
              <p>
                The liability of ML Corporate Services Ltd and its employees,
                directors and agents, for any claims arising out of or in
                connection with the services provided shall be limited to
                damages equivalent to an amount not exceeding the fee received
                from you for the year in which the cause of action has arisen.
              </p>
            </li>
          </ol>
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        REMUNERATION
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          Upon signature of this document, should you put an end to the
          professional relationship by not going further with the incorporation
          or setting up of the entity for which the present document was sent,
          the client hereby agrees to pay at a rate of USD 150 per hour for the
          advisory work done.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        SUMMARY TERMINATION
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          You agree that, prior to the signature of the services agreement, ML
          Corporate Services Ltd may at any time in its absolute discretion and
          without giving any reason terminate the intended business relation and
          cease performing all or any of the services on your behalf and if ML
          Corporate Services Ltd should exercise such discretion it will
          promptly advise you and you undertake to assist ML Corporate Services
          Ltd to give effect to such cessation by securing the appointment of
          another service provider as the circumstances may require. You further
          agree that any accrued rights or obligations of the parties hereunder
          will continue notwithstanding the termination of this engage.
        </p>
      </Typography>

      <Typography
        variant="h3"
        fontWeight="700"
        gutterBottom
        sx={{ textDecoration: "underline", fontStyle: "italic" }}
      >
        DISCLAIMER:
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
        sx={{ textDecoration: "underline", fontStyle: "italic" }}
      >
        <p>
          This Client Acceptance Form is a binding accord between ML Corporate
          Services Ltd and the client. ML Corporate Services Ltd has a system of
          internal controls to manage the Anti-Money Laundering/Combating
          financing of terrorism (AML/CFT) risks and to provide a systematic and
          disciplined approach to assuring compliance with AML/CFT laws, codes
          and standards of good practice and as such will retain copies of all
          documents provided to it in order to establish and verify your
          identity, current address, financial status and nature of business.
          You consent to the release of any documents or other information
          provided to ML Corporate Services Ltd to any governmental authorities
          or other persons to whom ML Corporate Services Ltd is lawfully
          required to release such information. ML Corporate Services Ltd does
          not assume responsibility towards or accept liability to any third
          party for the contents thereof.
        </p>
      </Typography>
      <Typography variant="h3" fontWeight="700" gutterBottom>
        DISPUTE RESOLUTION
      </Typography>
      <Typography
        variant="h4"
        fontWeight="500"
        gutterBottom
        textAlign="justify"
      >
        <p>
          Unless we agree otherwise with you in the Engagement Letter or to the
          extent that this is not permitted by any Applicable Law and
          Regulations: (i) this Client Acceptance Form, any Engagement Letter,
          the provision by us of Services to you and any dispute between us
          arising out of or in connection with any of them (including any non-
          contractual disputes or claims) ("Dispute") shall be governed by
          Rwandan law; (ii) you and we will attempt to settle any Dispute, by
          mediation in accordance with the CEDR Model Mediation Procedure or
          such other procedure as we both agree is appropriate; and (iii) if the
          Dispute is not settled by mediation within a reasonable period, then
          it shall be referred to, and finally resolved by, arbitration: in
          Kigali; by a single arbitrator (agreed between us or, in default of
          agreement, appointed on the application of either of us, by the
          President of the Kigali International Arbitration Centre); and under
          the Arbitration Rules of the Kigali International Arbitration Center,
          which shall be deemed to be incorporated into this Client Acceptance
          Form.
        </p>
      </Typography>
    </Paper>
  );
};

export default TermsAndConditions;
