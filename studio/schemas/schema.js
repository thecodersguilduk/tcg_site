// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import blog from "./documents/blog";
import team from "./documents/team";
import testimonial from "./documents/testimonials";
import categories from "./documents/categories";
import courses from "./documents/courseSchemas/course";
import courseTypes from "./documents/courseSchemas/courseTypes";
import courseDurations from "./documents/courseSchemas/courseDuration";
import courseTopics from "./documents/courseSchemas/courseTopics";
import coursePartners from "./documents/courseSchemas/coursePartners";
import courseProject from "./documents/courseSchemas/courseProject";
import imageSection from "./documents/components/imageSection";
import applyBtn from "./documents/components/applyBtn";
import callModal from "./documents/components/callModal";
import apprenticeAd from "./documents/apprenticeAd";
import leadSentence from "./documents/components/leadSentence.js";
import styledHeading from "./documents/components/styledHeading.js";
import supportingSentence from "./documents/components/supportingSentence.js";
import hr from "./documents/components/hr";
import policies from "./documents/policies";
import vacancies from "./documents/vacancies";
import interviewQuestions from "./documents/interviewQuestions";
import newsletter from "./documents/components/newsletter";
import form from "./documents/components/form";
import locations from "./documents/locations";
import youtube from "./documents/components/youtubeEmbed";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "blog",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    blog,
    team,
    testimonial,
    categories,
    courses,
    courseTypes,
    courseDurations,
    courseTopics,
    coursePartners,
    courseProject,
    imageSection,
    applyBtn,
    callModal,
    apprenticeAd,
    styledHeading,
    leadSentence,
    supportingSentence,
    hr,
    policies,
    newsletter,
    form,
    vacancies,
    interviewQuestions,
    locations,
    youtube,
  ]),
});
