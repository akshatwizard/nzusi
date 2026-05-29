export type MenuType = {
  name: string;
  path: string;
  subMenu:
  | {
    name: string;
    path: string | null;
    open_in_new_tab?: boolean;
  }[]
  | null;
};

export const Menu: MenuType[] = [
  {
    name: "Home",
    path: "/",
    subMenu: null,
  },
  {
    name: "About",
    path: "/about",
    subMenu: null,
  },
  {
    name: "Events",
    path: "/events",
    subMenu: null,
  },
  // {
  //     name: "Membership",
  //     path: "/membershop"
  // },
  {
    name: "Public Awareness",
    path: "/public-health-awareness",
    subMenu: null,
  },
  {
    name: "NZUSICON '26'",
    path: "#",
    subMenu: [
      {
        name: "Submit Abstract",
        path: null,
      },
      {
        name: "Submission Guidelines",
        path: "/abstracts-2026/guidelines",
      },
    ],
  },
  {
    name: "Blogs & News",
    path: "/blogs-and-news",
    subMenu: null,
  },
  {
    name: "NZI YouTube",
    path: "https://www.youtube.com/@nzusioffice7256",
    subMenu: null,
  },
  {
    name: "Resources",
    path: "#",
    subMenu: [
      {
        name: "Bid Form",
        path: "#",
        open_in_new_tab: false
      },
      {
        name: "Membership Form",
        path: "/files/NZUSI-MEMBERSHIP-APPLICATION-FORM.pdf",
        open_in_new_tab: true
      },
      {
        name: "NZUSICON Form",
        path: "/files/NZ-USICON-REGISTRATION-FORM.pdf",
        open_in_new_tab: true
      },
      {
        name: "Nomination Form",
        path: "#",
        open_in_new_tab: false
      },
    ],
  },
];
