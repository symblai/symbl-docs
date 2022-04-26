import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {RedocStandalone} from 'redoc';
import styles from "./redoc.module.css";

export default function ApiPlayground() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout>
            <main>
                <RedocStandalone spec={siteConfig.customFields.apiSpec} options={{
                    scrollYOffset: '.navbar', // makes the fixed sidebar and scrolling play nicey with docusaurus navbar
                    theme: {
                          "breakpoints": {
                            "small": "10rem",
                            "medium": "40rem",
                            "large": "85rem"
                          },
                          "panels": {
                            "backgroundColor": "#000",
                          },
                          "colors": {
                            "primary": {
                              // "main": "rgba(246, 20, 63, 1)",
                              "light": "rgba(255,0,0, 1)",
                              "dark": "rgba(255,255,255,1)"
                            },
                            "success": {
                              "main": "rgba(28, 184, 65, 1)",
                              "light": "#81ec9a",
                              "dark": "#083312",
                              "contrastText": "#000"
                            },
                            "text": {
                              "primary": "rgba(0, 0, 0, 1)",
                              "light": "rgba(255,255,255,1)", 
                              "secondary": "#4d4d4d"
                            },
                            "http": {
                              "get": "rgba(0, 200, 219, 1)",
                              "post": "rgba(28, 184, 65, 1)",
                              "put": "rgba(255, 187, 0, 1)",
                              "delete": "rgba(254, 39, 35, 1)"
                            }
                          },
                          "typography": {
                            "fontSize": "16px",
                            "fontFamily": "Fira Sans, Roboto, sans-serif",
                            "optimizeSpeed": true,
                            "smoothing": "antialiased",
                            "headings": {
                              "fontWeight": "bold",
                              "lineHeight": "1em"
                            },
                            "code": {
                              "fontWeight": "600",
                              // "color": "rgba(92, 62, 189, 1)",
                              "color": "#000",
                              "wrap": true
                            },
                            "links": {
                              "color": "rgba(0, 0, 255, 1)",
                              "visited": "rgba(0, 0, 255, 1)",
                              "hover": "rgb(0,255,0)"
                            }
                          },
                          "sidebar": {
                            "width": "300px",
                            "textColor": "#000000",
                          },
                          "rightPanel": {
                            "backgroundColor": "rgba(55, 53, 71, 1)",
                            "textColor": "#ffffff"
                          },
                        }
                      
                }}/>
            </main>
        </Layout>
    );
}