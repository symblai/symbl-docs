import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
// import './homepage.scss';

import TutorialImage1 from '../images/tutorial-1.png';
import TutorialImage2 from '../images/tutorial-2.png';
import TutorialImage3 from '../images/tutorial-3.png';
import TutorialImage4 from '../images/tutorial-4.png';

import ExampleImage from '../images/example.png';
import PostmanImage from '../images/postman.png';


function Homepage(props) {
  return (
    <Layout title="Homepage">
      <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      <div className="homepage-section">

        <div className="sidebar" id="how-does-symbl-work">
          <h2 className="title">How does Symbl work?</h2>
          <p className="text">Send your conversation data to Symbl from virtually any source. Then analyze it.</p>

          <div className="step" id="step-1">
            <div className="step-title">
              <h3>Step 1: Ingest</h3>
            </div>
            <div className="step-item">
              <p className="item-title">For live captioning</p>
              <p><Link to="/docs/streamingapi/introduction">Streaming API</Link></p>
            </div>

            <div className="step-item">
              <p className="item-title">For PSTN</p>
              <p><Link to="/docs/telephony/introduction">Telephony API</Link></p>
            </div>

            <div className="step-item">
              <p className="item-title">For recorded files</p>
              <p><Link to="/docs/async-api/overview/text/post-text">Text API</Link></p>
              <p><Link to="/docs/async-api/overview/audio/post-text">Audio API</Link></p>
              <p><Link to="/docs/async-api/overview/video/post-text">Video API</Link></p>
            </div>
          </div>

          <div className="step" id="step-2">
            <div className="step-title">
              <h3>Step 2: Analyze</h3>
            </div>
            <div className="step-item">
              <p className="item-subtitle"><Link to="/docs/concepts/speech-to-text/">Speech to Text/Transcription</Link></p>
              <p className="item-description">Convert audio and video conversation into text. We support 20+ languages and punctuations.</p>
            </div>

            <div className="step-item">
              <p className="item-subtitle"><Link to="/docs/concepts/action-items/">Action Items</Link></p>
              <p className="item-description">Track who was assigned what tasks in a meeting using Action Items.</p>
            </div>

            <div className="step-item">
              <p className="item-subtitle"><Link to="/docs/concepts/sentiment-analysis/">Sentiment Analysis</Link></p>
              <p className="item-description">Understand whether what speaker spoke was positive, sad or negative in the conversation.</p>
            </div>

            <div className="step-item">
              <p className="item-subtitle"><Link to="/docs/concepts/conversational-analytics/">Conversational Analytics</Link></p>
              <p className="item-description">Find out what is the <strong>speaker’s talk time is, rate of speaking, silence and over lap over another speaker?</strong></p>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="inner">
            <h1 className="title">Explore Our Tutorials</h1>

            <ul className="tutorials">
              <li>
                <div className="tutorial-head">
                  <p><Link to="/docs/async-api/introduction">Async API</Link></p>
                  <Link to="/docs/async-api/overview/audio/post-audio">
                    <img src={TutorialImage1} />
                  </Link>
                </div>
                <div className="tutorial-body">
                  <h5><Link to="/docs/async-api/overview/audio/post-audio">Insights from recorded files</Link></h5>
                  <p>Upload an audio/video file by sending a simple cURL request and get Speech to Text and other AI Insights.</p>
                </div>
              </li>

              <li>
                <div className="tutorial-head">
                  <p><Link to="/docs/streamingapi/introduction">Streaming API</Link></p>
                  <Link to="/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser">
                    <img src={TutorialImage2} />
                  </Link>
                </div>
                <div className="tutorial-body">
                  <h5><Link to="/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser">Live captioning</Link></h5>
                  <p>Connect Symbl to your browser with a small code snippet, get Speech to Text and other AI Insights.</p>
                </div>
              </li>
              
              <li>
                <div className="tutorial-head">
                  <p><Link to="/docs/telephony/introduction">Telephony API</Link></p>
                  <Link to="/docs/telephony/tutorials/connect-to-zoom">
                    <img src={TutorialImage3} />
                  </Link>
                </div>
                <div className="tutorial-body">
                  <h5><Link to="/docs/telephony/tutorials/connect-to-zoom">Insights from Zoom Call</Link></h5>
                  <p>Connect Symbl to your Zoom call, get Speech to Text and other AI Insights.</p>
                </div>
              </li>
              
              <li>
                <div className="tutorial-head">
                  <p><Link to="/docs/async-api/introduction">Async API</Link></p>
                  <Link to="/docs/async-api/tutorials/get-speaker-separation-audio-video">
                    <img src={TutorialImage4} />
                  </Link>
                </div>
                <div className="tutorial-body">
                  <h5><Link to="/docs/async-api/tutorials/get-speaker-separation-audio-video">Quickstart tutorial</Link></h5>
                  <p>Enable Speaker Separation for the Async Audio or Async Video APIs to get speaker-separated transcripts and insights.</p>
                </div>
              </li>
            </ul>

            <div id="experience-api">
              <div className="inner">
                <h2 className="title">Experience API and Symbl Elements</h2>
                <div className="demo">
                  <div>
                    <p>Rich, flexible pre-built UI to get up and running fast.</p>
                    <div className="btn-container">
                      <a href="/docs/pre-built-ui/video-summary-ui" className="btn">Learn more</a>
                      <a href="https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI2NTA0OTI1MTg4MDYzMjMyIiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0LzE5MzE0MjMwMjMubXA0In0=?showVideoSummary=true" target="_blank" className="btn">Live demo</a>
                    </div>
                  </div>
                  <div>
                    <img src={ExampleImage} alt="Example video" />
                  </div>
                </div>
              </div>
            </div>

            <div id="postman">
              <h2 className="title">Try it in Postman</h2>
              <p>Postman is a tool to help test and develop APIs. Find our Postman collection that contains the full set of APIs below.</p>
              <div className="img-container">
                <Link to="/docs/developer-tools/postman">
                  <img src={PostmanImage} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Homepage;