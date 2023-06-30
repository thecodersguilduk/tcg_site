const fetchPolicies = require("./policies_list.js");

const getPoliciesForFooter = async () => {
  try {
    const fetchedPolicies = await fetchPolicies();
    const footerPolicies = fetchedPolicies
      .filter((policy) => policy.inFooter && policy.isPublic)
      .map((policy) => {
        return {
          label: policy.name,
          url: policy.fileLink,
        };
      });
    return footerPolicies;
  } catch (error) {
    return error;
  }
};

const footerLinks = [
  {
    label: "Sitemap",
    url: "/sitemap.xml",
  },
  {
    label: "Vacancies",
    url: "/jobs/",
  },
  {
    label: "All Policies",
    url: "/policies",
  },
  {
    label: "Reviews",
    url: "/reviews",
  },
];

module.exports = async () => {
  const policies = await getPoliciesForFooter();
  const reviewsLink = footerLinks.find((link) => link.label === "Reviews");
  const filteredLinks = footerLinks.filter((link) => link.label !== "Reviews");

  const section = {
    title: "Quick Links",
    links: [...filteredLinks, ...policies, reviewsLink],
  };

  return {
    main: [
      {
        label: "apprenticeships",
        url: "/apprenticeships",
      },
      {
        label: "courses",
        url: "",
        submenu: [
          {
            label: "Course Directory",
            url: "/course-directory",
          },
          {
            label: "West Yorkshire",
            url: "/west-yorkshire",
          },
        ],
      },
      {
        label: "about us",
        url: "/about",
      },
      {
        label: "Jobs",
        url: "",
        submenu: [
          {
            label: "Work With Us",
            url: "/jobs/",
          },
          {
            label: "Apprenticeship Vacancies",
            url: "/jobs/apprenticeship-vacancies/",
          },
        ],
      },
      {
        label: "blog",
        url: "/blog",
      },
      {
        label: "contact us",
        url: "/contact-us",
      },
    ],

    footer: [section],
    social_links: [
      {
        title: "linkedin",
        url: "https://www.linkedin.com/company/the-coders-guild",
        icon: "fa-linkedin-in",
      },
      {
        title: "twitter",
        url: "https://twitter.com/the_codersguild",
        icon: "fa-twitter",
      },
      {
        title: "instagram",
        url: "https://www.instagram.com/thecodersguild/",
        icon: "fa-instagram",
      },
      {
        title: "facebook",
        url: "https://www.facebook.com/TheCodersGuild/",
        icon: "fa-facebook-f",
      },
      {
        title: "youtube",
        url: "https://www.youtube.com/channel/UC_By6GiE5aVoMyoTLr5lGZA",
        icon: "fa-youtube",
      },
      {
        title: "github",
        url: "https://github.com/thecodersguilduk",
        icon: "fa-github",
      },
    ],
  };
};
