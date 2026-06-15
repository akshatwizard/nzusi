export type MenuType = {
  name: string;
  path: string;
  subMenu:
  | {
    name: string;
    path: string | null;
    open_in_new_tab?: boolean;
    subMenu?: {
      name: string;
      path: string | null;
      open_in_new_tab?: boolean;
    }[],
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
        name: "Bidding",
        path: null,
        open_in_new_tab: false,
        subMenu: [
          {
            name: "Bidding Proforma",
            path: "/files/NZUSICON_Bidding_Proforma.pdf",
            open_in_new_tab: true
          },
          {
            name: "Bidding Form",
            path: "/files/NZUSI_Bidding_Form.pdf",
            open_in_new_tab: true
          },
          {
            name: "MOU",
            path: "/files/MOU_Bidding.pdf",
            open_in_new_tab: true
          },
        ]
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
        name: "Elections Nomination Form",
        path: "/files/Nomination_Form.pdf",
        open_in_new_tab: false
      },
      {
        name: "Fellowship Form",
        path: "/files/App_Form_For_Fellowships.pdf",
        open_in_new_tab: true
      },
      {
        name: "Duscon Awards Form",
        path: "/files/App_Form_For_Duscon_Awards.pdf",
        open_in_new_tab: true
      },
    ],
  },
];
