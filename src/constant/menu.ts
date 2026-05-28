export type MenuType = {
  name: string;
  path: string;
  subMenu:
    | {
        name: string;
        path: string | null;
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
    name: "NZI YouTube Channel",
    path: "https://www.youtube.com/@nzusioffice7256b",
    subMenu: null,
  },
];
