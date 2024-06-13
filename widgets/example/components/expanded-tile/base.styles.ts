export default `
      :host {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        background-color: white;
        overflow: hidden;
      }
      .exit {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      }
      .panel {
        display: flex;
        position: relative;
        background-color: white;
        width: 100%;
        height: 100%;
      }
      .panel-left {
        min-width: 40%;
        max-width: 40%;
      }
      .panel-left img {
        width: 100%;
      }
      .panel-right {
        padding: 20px;
      }
      div.image {
        position: relative;
      }
      .image-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-bottom: 16px;
      }
      .image-wrapper-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
`;
