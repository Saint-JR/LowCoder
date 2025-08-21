const schema = {
  id: 'schema-001',
  title: 'Sample Schema',
  creator: 'John Doe',
  createTime: '2024-12-20T10:00:00Z',
  materials: ['wood', 'metal', 'plastic'],
  requests: [
    {
      id: 'request-001',
      title: 'Fetch Data',
      content: 'Retrieve necessary data from the server.',
      prop: 'dataEndpoint',
    },
    {
      id: 'request-002',
      title: 'Submit Form',
      content: 'Submit form data to the server.',
      prop: 'formEndpoint',
    },
  ],
  globalVariables: [
    {
      name: 'open',
      defaultValue: false,
      type: 'boolean',
    },
  ],
  content: {
    id: 'node-001',
    name: 'MainComponent',
    title: 'Main UI Component',
    material: 'root-container',
    style: {},
    attribute: {
      isVisible: 'true',
      isEnabled: 'true',
    },
    hook: {
      onClick: 'function(){}',
      onHover: 'function(){}',
    },
    slot: {
      content: {
        id: 'root-container-content',
        name: 'content',
        title: 'Content Slot',
        content: [],
      },
    },
  },
};

export default schema;
