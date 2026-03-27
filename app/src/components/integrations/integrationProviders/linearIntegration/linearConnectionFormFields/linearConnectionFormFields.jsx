/*
 * Copyright 2025 EPAM Systems
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

import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { SECRET_FIELDS_KEY } from 'controllers/plugins';
import { commonValidators } from 'common/utils/validation';
import { FieldErrorHint } from 'components/fields/fieldErrorHint';
import { FieldElement } from 'pages/inside/projectSettingsPageContainer/content/elements';
import { FieldText } from '@reportportal/ui-kit';
import { COMMON_BTS_MESSAGES } from 'components/integrations/elements/bts';
import { DEFAULT_FORM_CONFIG } from '../constants';
import { messages } from '../messages';
import styles from './linearConnectionFormFields.scss';

const cx = classNames.bind(styles);

@injectIntl
export class LinearConnectionFormFields extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    initialData: PropTypes.object,
    editAuthMode: PropTypes.bool,
    updateMetaData: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    initialData: DEFAULT_FORM_CONFIG,
    editAuthMode: false,
    updateMetaData: () => {},
  };

  componentDidMount() {
    this.props.initialize(this.props.initialData);
    this.props.updateMetaData({
      [SECRET_FIELDS_KEY]: ['apiKey'],
    });
  }

  render() {
    const {
      intl: { formatMessage },
      disabled,
      editAuthMode,
    } = this.props;

    return (
      <Fragment>
        <FieldElement
          name="integrationName"
          label={formatMessage(COMMON_BTS_MESSAGES.integrationNameLabel)}
          validate={commonValidators.btsIntegrationName}
          disabled={disabled}
          className={cx('fields')}
          isRequired
          dataAutomationId="integrationNameField"
        >
          <FieldErrorHint provideHint={false}>
            <FieldText defaultWidth={false} />
          </FieldErrorHint>
        </FieldElement>
        <FieldElement
          name="url"
          label={formatMessage(COMMON_BTS_MESSAGES.linkToBtsLabel)}
          validate={commonValidators.btsUrl}
          disabled={disabled || editAuthMode}
          className={cx('fields')}
          isRequired
          dataAutomationId="linkToBTSField"
        >
          <FieldErrorHint provideHint={false}>
            <FieldText defaultWidth={false} />
          </FieldErrorHint>
        </FieldElement>
        <FieldElement
          name="project"
          label={formatMessage(messages.teamKeyLabel)}
          description={formatMessage(messages.teamKeyDescription)}
          validate={commonValidators.btsProjectKey}
          disabled={disabled}
          className={cx('fields')}
          isRequired
          dataAutomationId="projectKeyInBTSField"
        >
          <FieldErrorHint provideHint={false}>
            <FieldText defaultWidth={false} />
          </FieldErrorHint>
        </FieldElement>
        <FieldElement
          name="apiKey"
          label={formatMessage(messages.apiKeyLabel)}
          description={formatMessage(messages.apiKeyDescription)}
          validate={commonValidators.requiredField}
          disabled={disabled}
          className={cx('last-fields')}
          isRequired
          dataAutomationId="apiKeyField"
        >
          <FieldErrorHint provideHint={false}>
            <FieldText defaultWidth={false} type="password" />
          </FieldErrorHint>
        </FieldElement>
      </Fragment>
    );
  }
}
