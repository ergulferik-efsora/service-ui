/*
 * Copyright 2019 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { analyticsEnabledSelector } from 'controllers/appInfo';
import { AnalyticsWrapper } from 'components/main/analytics';
import { fetchInitialDataAction, initialDataReadySelector } from 'controllers/initialData';

@connect(
  (state) => ({
    isAnalyticsEnabled: analyticsEnabledSelector(state),
    isInitialDataReady: initialDataReadySelector(state),
  }),
  {
    fetchInitialDataAction,
  },
)
export class InitialDataContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    initialDispatch: PropTypes.func.isRequired,
    isAnalyticsEnabled: PropTypes.bool.isRequired,
    fetchInitialDataAction: PropTypes.func.isRequired,
    isInitialDataReady: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    initialDataReady: false,
  };

  componentDidMount() {
    this.props.fetchInitialDataAction();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isInitialDataReady !== this.props.isInitialDataReady &&
      this.props.isInitialDataReady
    ) {
      this.props.initialDispatch();
    }
  }

  render() {
    const { isAnalyticsEnabled, isInitialDataReady, children } = this.props;

    return isInitialDataReady ? (
      <AnalyticsWrapper isEnabled={isAnalyticsEnabled}>{children}</AnalyticsWrapper>
    ) : (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f6f8',
          zIndex: 99999,
        }}
      >
        <div style={{ marginBottom: 32, animation: 'rp-logo-pulse 2s ease-in-out infinite' }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 26.6396L12 30.5845C12 30.8814 12.1554 31.1557 12.4075 31.3042L23.5925 37.8887C23.8446 38.0371 24.1554 38.0371 24.4075 37.8887L35.5925 31.3042C35.8446 31.1557 36 30.8814 36 30.5845V25.2811L24 32.3706L16.8905 28.1853L16.8905 23.7606L12 26.6396Z"
              fill="#009BB9"
            />
            <path
              d="M24 15.6294L31.1095 19.8147V24.3059L36 21.4269V17.4155C36 17.1186 35.8446 16.8443 35.5925 16.6958L24.4075 10.1113C24.1554 9.96288 23.8446 9.96288 23.5925 10.1113L12.4075 16.6958C12.1554 16.8443 12 17.1186 12 17.4155L12 22.8109L24 15.6294Z"
              fill="#009BB9"
            />
          </svg>
        </div>
        <div
          style={{
            width: 200,
            height: 3,
            backgroundColor: '#e0e3eb',
            borderRadius: 3,
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: '40%',
              height: '100%',
              background: 'linear-gradient(90deg, #009BB9, #1DBDD6)',
              borderRadius: 3,
              animation: 'rp-bar-slide 1.4s ease-in-out infinite',
            }}
          />
        </div>
        <div
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
            fontSize: 13,
            color: '#8a909d',
            letterSpacing: 0.5,
          }}
        >
          Loading ReportPortal
        </div>
        <style>
          {`
            @keyframes rp-logo-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(0.97); }
            }
            @keyframes rp-bar-slide {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(250%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </div>
    );
  }
}
