export default `
      :host {
        padding: 0 30px;
        box-sizing: border-box;
        display: inline-block;
        margin: 30px auto;
        max-width: 1060px;
        position: relative;
        vertical-align: middle;
        width: 100%;
        background: #f4f4f4;
      }
      .exit {
        position: absolute;
        top: 20px;
        right: 0;
      }
      .panel {
        display: flex;
        position: relative;
        background: #f4f4f4;
        width: 100%;
        height: 100%;
      }
      .panel-left {
        min-width: 40%;
        max-width: 40%;
        background: #fff;
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
      }
      .panel-left img {
        width: 100%;
      }
      .panel-right {
        padding: 26px 40px;
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

      .user-info-wrapper {
        text-aligh: left;
      }

      .user-info-wrapper a {
        color: #666;
        font-family: 'Roboto Condensed', sans-serif;
        text-decoration: none;
        line-height: 1.4;
      }

      .user-top {
        font-weight: 700;
        font-size: 1.5em;
        text-transform: uppercase;
      }

      .user-bottom {
        font-size: 1.2em;
        font-weight: 300;
      }

      .caption-paragraph {
        line-height: 1.5em;
        font-weight: 700;
        font-size: 1.5em;
      }
`;
