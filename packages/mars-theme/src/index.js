import Theme from "./components";
import image from "@frontity/html2react/processors/image";

const before = ({ libraries }) => {
  // We use html2react to process the <img> tags inside the content HTML.
  libraries.html2react.processors.push(image);

  libraries.source.handlers.push({
    name: "project",
    priority: 10,
    pattern: "/project/:slug",
    func: async ({ route, params, state, libraries }) => {
      // 1. get product
      const response = await libraries.source.api.get({
        endpoint: `projects/${params.slug}`,
      });

      // 2. add product to state
      const [project] = await libraries.source.populate({ response, state });

      // 3. add route to data
      Object.assign(state.source.data[route], {
        id: project.id,
        type: project.type,
        isPostType: true,
        isProject: true
      });
    }
  });
};

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    theme: Theme
  },
  state: {
    theme: {
      menu: [],
      active: false,
      photoIndex: 0,
      isOpen: false,
      isListView: false,
      isActive: false,
      selectedCategory: 'All',
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  },
  actions: {
    theme: {
      beforeSSR: before,
      beforeCSR: before,
    }
  }
};

export default marsTheme;
