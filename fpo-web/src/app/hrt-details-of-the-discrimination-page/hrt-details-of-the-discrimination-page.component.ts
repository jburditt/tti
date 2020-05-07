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
  selector: "app-hrt-details-of-the-discrimination-page",
  templateUrl: "./hrt-details-of-the-discrimination-page.component.html",
  styleUrls: ["./hrt-details-of-the-discrimination-page.component.scss"],
})
export class HrtDetailsOfTheDiscriminationPageComponent
  implements OnInit, OnDestroy {
  subscription: Subscription;
  private json = {
    showNavigationButtons: false,
    completeText: "",
    showQuestionNumbers: "off",
    pages: [
      {
        name: "Details of the Discrimination",
        elements: [
          {
            type: "html",
            name: "question1",
            html:
              "<p>\nTo show possible discrimination under the Human Rights Code, you must show:\n</p>\n<ul><li>\nThe Respondent harmed you in the area you selected, such as employment. The legal term is “adverse effect” regarding the area. </li>\n<li>\nThe harm is based on grounds you selected. The legal term is that the grounds “are a factor in” or are “connected to” the harm.\n</li></ul>",
          },
          {
            type: "comment",
            name: "Describe what your complaint is about in a few words. ",
            description:
              "Example. This person fired me based on my race. You can give details below.\n",
            isRequired: true,
          },
          {
            type: "comment",
            name: "Describe the harm in a few word",
            description:
              "Example. I lost my job and I felt terrible. You can say what remedy you want below",
            isRequired: true,
          },
          {
            type: "comment",
            name:
              "Explain how the harm relates to the grounds you have selected before.",
            description:
              "Examples: The words my manager used are slurs about my race; Security only followed me around the store, not the other people who were not First Nations; The respondent fired me one week after they learned I was pregnant; A white male colleague got the promotion. I am at least as qualified. I am a Black woman; My employer said I have to work Saturdays. My religion does not allow me to work Saturdays; My employer disciplined me for shouting at someone. My disability caused me to shout; This organization refused to provide an interpreter which I need because I am Deaf.\nIf you need help, you can contact the BC Human Rights Clinic or the Law Center",
            isRequired: true,
          },
        ],
      },
      {
        name: "page1",
        elements: [
          {
            addRowText: "Add Event",
            removeRowText: "Remove Event",
            type: "matrixdynamic",
            name:
              "Describe what this Respondent did that harmed you based on the grounds. ",
            description:
              "Be specific. Example. Do not say, “This person bullied me.” Write out the words they used. Give the date for each event. If you don’t know the exact date, give an approximate date. Examples. February 3, 2020. February 2020.",
            isRequired: true,
            columns: [
              {
                name: "Respondent",
                isRequired: true,
                width: "20%",
              },
              {
                name: "Event",
                isRequired: true,
                width: "60%",
              },
              {
                name: "Date",
                cellType: "text",
                isRequired: true,
                width: "20%",
                validators: [
                  {
                    type: "regex",
                    text: "Please enter the correct date",
                    regex:
                      "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))",
                  },
                ],
              },
            ],
            choices: [1, 2, 3, 4, 5],
            cellType: "text",
            rowCount: 1,
          },
        ],
      },
    ],
  };

  survey: any;
  formData: object;
  constructor(private missionService: MissionService, private router: Router) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      (allFormData) => {
        console.log("allFormData", allFormData);

        if (allFormData.detailsOfDiscrimination) {
          this.formData = allFormData.detailsOfDiscrimination;
          console.log("hi!");
        }
        this.subscription.unsubscribe();
      }
    );
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    // console.log('Survey.Survey.cssType', Survey.Survey.cssType)
    this.initSurvey();

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
    if (this.formData) {
      console.log("hi122!");
      this.survey.data = this.formData;
    }
    console.log("hi!2");
    Survey.SurveyNG.render("surveyElementHRT", { model: this.survey });
    console.log("hi!3");
  }
  handlePreviousStep() {
    if (this.survey.isFirstPage) {
      return;
    }
    this.survey.prevPage();
    // this.currentPageTitle = this.survey.currentPage.title;
  }
  handleNextStep() {
    if (this.survey.isLastPage) {
      const validated = this.survey.completeLastPage();
      if (validated) {
        this.missionService.confirmMission({
          name: "detailsOfDiscrimination",
          data: this.survey.data,
          complete: true,
        });
        this.router.navigateByUrl("hrt/progress");
      }
    } else {
      this.survey.nextPage();
    }
  }
}
