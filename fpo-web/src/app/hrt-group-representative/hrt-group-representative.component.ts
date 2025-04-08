import { Component, OnInit, OnDestroy } from "@angular/core";

import { MissionService } from "../mission.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

// import Inputmask from "inputmask";
// import * as widgets from 'surveyjs-widgets';
// Import Survey.js
import * as Survey from "survey-angular";
// import { addQuestionTypes } from '../survey/question-types';
// widgets.inputmask(Survey);
@Component({
  selector: "app-hrt-group-representative",
  templateUrl: "./hrt-group-representative.component.html",
  styleUrls: ["./hrt-group-representative.component.scss"],
})
export class HrtGroupRepresentativeComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  currentPage = 0;
  pageTitles = [
    "Who is representing the group or class (Representative)?",
    "Who will communicate with the Tribunal about this Complaint?",
    "Name of the person who will communicate with the Tribunal, if different from the Representative",
    "Representative’s address for Delivery",
  ];
  currentPageTitle = "";
  pageHelpText = {
    "Who is representing the group or class (Representative)?a":
      "<p>A Representative can be an organization or an individual. Complete either organization name or name of individual. If you are writing on behalf of an organization, give the organization name here, then give your name as the person who will communicate with the Tribunal in the next question.</p>",
  };

  handlePopupClick() {
    console.log(123);
    this.showDescription({
      popupdescription: this.pageHelpText[this.currentPageTitle],
    });
  }
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",
    showPageTitles: false,
    pages: [
      {
        name: "Who is representing the group or class?",
        elements: [
          {
            type: "radiogroup",
            name: "Is the representative:",
            isRequired: true,
            choices: ["An organization", "An individual"],
          },
        ],
        title: "Who is representing the group or class (Representative)?",
      },
      {
        name: "Who is representing the group or class (Representative)?",
        elements: [
          {
            type: "text",
            name: "Organization Name",
            visibleIf: "{Is the representative:} = 'An organization'",
            isRequired: true,
            maxLength: 255,
          },
          {
            type: "text",
            name: "Individual Legal name – First name",
            "requiredIf": "{Is the representative:} = 'An individual'",
            maxLength: 40,
          },
          {
            type: "text",
            name: "Individual Legal Name – Last name",
            "requiredIf": "{Is the representative:} = 'An individual'",
            maxLength: 40,
          },
          {
            type: "text",
            name: "Preferred name",
            title: "Preferred name – e.g. traditional name, nickname, alias",
          },
          {
            type: "checkbox",
            name: "Use my preferred name",
            choices: [
              "When talking to me",
              "When writing to me",
              "In decision in addition to my legal name",
            ],
          },
          {
            type: "radiogroup",
            name: "Title",
            hasOther: true,
            choices: ["Mr.", "Ms.", "Mx."],
            otherText: "Not listed above",
          },
          {
            type: "radiogroup",
            name: "Pronoun",
            hasOther: true,
            choices: ["She", "He", "They"],
            otherText: "Not listed above",
          },
        ],
        title: "Who is representing the group or class (Representative)?",
      },
      {
        name: "Who will communicate with the Tribunal about this Complaint?",
        elements: [
          {
            type: "radiogroup",
            name: "Select only one option",
            isRequired: true,
            choices: [
              "The Representative of the group or class or, if the Representative is an organization, the individual speaking for the organization",
              "A lawyer for the Representative",
              "A legal advocate for the Representative (Example: A person who works for a law clinic)",
            ],
          },
        ],
        title: "Who will communicate with the Tribunal about this Complaint?",
      },
      {
        name:
          "Name of the person who will communicate with the Tribunal, if different from the Representative",
        elements: [
          {
            type: "text",
            name: "First name",
            isRequired: true,
            maxLength: 40,
          },
          {
            type: "text",
            name: "Last name",
            isRequired: true,
            maxLength: 40,
          },
          {
            type: "text",
            name: "Representative Preferred name",
            title: "Preferred name – e.g. traditional name, nickname, alias",
            maxLength: 255,
          },
          {
            type: "text",
            name: "Representative Organization Name",
            title: "Organization Name (e.g. law firm, if applicable)",
            maxLength: 255,
          },
          {
            type: "radiogroup",
            name: "Representative Title",
            title: "Title",
            hasOther: true,
            choices: ["Mr.", "Ms.", "Mx."],
            otherText: "Not listed above",
          },
          {
            type: "radiogroup",
            name: "Representative Pronoun",
            title: "Pronoun",
            hasOther: true,
            choices: ["She", "He", "They"],
            otherText: "Not listed above",
          },
        ],
        visibleIf:
          "{Select only one option} <> 'The Representative of the group or class or, if the Representative is an organization, the individual speaking for the organization'",
        title:
          "Name of the person who will communicate with the Tribunal",
      },
      {
        name: "Representative’s address for Delivery",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p>You must provide</p><ol type=\"a\"><li>an address where all parties can send you documents. Give the address of the person who will communicate with the Tribunal.</li><li>an email address, if possible. The Tribunal and parties usually communicate by email.</li></ol><p>If you have contact information that you want to keep confidential, do not put it on this form. Provide it by email, mail, fax, or in person.</p><p>  <strong>You must notify the Tribunal of any change to the address for delivery.</strong> A document sent to an address below is considered received by the complainant.</p>",
          },
          {
            type: "text",
            name: "Mailing address",
            title: "Mailing address",
            maxLength: 240,
          },
          {
            type: "text",
            name: "City",
            maxLength: 40,
            // isRequired: true,
          },
          {
            type: "dropdown",
            name: "Province",
            startWithNewLine: false,
            title: "Province",
            // isRequired: true,
            choices: [
              "Alberta",
              "British Columbia",
              "Manitoba",
              "New Brunswick",
              "Newfoundland and Labrador",
              "Nova Scotia",
              "Northwest Territories",
              "Nunavut",
              "Ontario",
              "Prince Edward Island",
              "Québec",
              "Saskatchewan",
              "Yukon",
            ],
          },
          {
            type: "text",
            name: "Postal Code",
            maxLength: 10,
            startWithNewLine: false,
            // isRequired: true,
          },
          {
            type: "text",
            name: "Phone number",
            maxLength: 255,
            // isRequired: true,
          },
          {
            type: "text",
            name: "Fax",
            maxLength: 255,
            startWithNewLine: false,
          },
          {
            type: "text",
            name: "Email",
            maxLength: 255,
            validators: [{ type: "email" }],
            // isRequired: true,
          },
        ],
        title: "Representative’s address for delivery",
      },
    ],
  };

  survey: any;
  formData: object;
  closed = true;

  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.representative) {
          this.formData = allFormData.representative;
          console.log("hi!");
        }
        // this.subscription.unsubscribe();
      }
    );
  }
  showDescription(element) {
    document.querySelector(".popup-body").innerHTML = element.popupdescription;
    // $("#questionDescriptionPopup").modal();
    this.toggleModal();
  }
  toggleModal() {
    console.log(123123123);
    this.closed = !this.closed;
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    //  this.initSurvey();

    //Add a property a text property into all questions types and into page
    Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

    this.renderSurvey();
  }
  initSurvey() {
    // addQuestionTypes(Survey);
    // console.log("Survey.Survey.cssType", Survey.Survey.cssType);
    // Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.page.root = "sv_page";
    Survey.defaultBootstrapCss.pageDescription = "sv_page_description";
    Survey.defaultBootstrapCss.pageTitle = "sv_page_title";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
    Survey.defaultBootstrapCss.question.title = "sv_q_title";
    Survey.defaultBootstrapCss.question.description = "sv_q_description small";
    Survey.defaultBootstrapCss.panel.title = "sv_p_title";
    Survey.defaultBootstrapCss.panel.container = "sv_p_container";
    Survey.defaultBootstrapCss.panel.description = "sv_p_description";
    Survey.defaultBootstrapCss.row = "sv_row";
    Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.button = "btn btn-default";
    Survey.defaultBootstrapCss.paneldynamic.root = "sv_p_dynamic"; // not used?
    Survey.defaultBootstrapCss.checkbox.item = "sv-checkbox";
    Survey.defaultBootstrapCss.checkbox.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.checkbox.materialDecorator = "";
    Survey.defaultBootstrapCss.radiogroup.item = "sv-radio";
    Survey.defaultBootstrapCss.radiogroup.controlLabel = "sv-checkbox-label";
    Survey.defaultBootstrapCss.radiogroup.materialDecorator = "";
    //Add a property a text property into all questions types and into page
    // Survey.JsonObject.metaData.addProperty("question", "popupdescription:text");
    // Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");
    // console.log(Survey.JsonObject.metaData.addProperty)
    Survey.StylesManager.applyTheme("bootstrap");
  }
  renderSurvey() {
    console.log("hi!1");
    // let surveyModel =
    this.survey = new Survey.Model(this.json);
    this.survey.maxOthersLength = 255;
    if (this.formData) {
      console.log("hi122!");
      this.survey.data = this.formData;
    }

    this.survey.onAfterRenderQuestion.add((survey, options) => {
      console.log("+++++++");
      console.log(options);

      //Return if there is no description to show in popup
      if (!options.question.popupdescription) return;
      console.log("has desc");
      //Add a button;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-default btn-xs";

      // btn.style.position = "absolute";
      btn.style.marginLeft = "10px";

      btn.innerHTML = "More Info";
      var question = options.question;
      btn.onclick = () => {
        this.showDescription(question);
      };
      var header = options.htmlElement.querySelector("h5");
      var span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });

    console.log("hi!2");
    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "representative",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt-group/progress");
      }
    } else {
      this.survey.nextPage();
      console.log(this.survey.currentPage);
      this.currentPageTitle = this.survey.currentPage.title;
    }
  }
  handlePreviousStep() {
    if (this.survey.isFirstPage) {
      return;
    }
    this.survey.prevPage();
    this.currentPageTitle = this.survey.currentPage.title;
  }
}
