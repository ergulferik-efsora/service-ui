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

import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  teamKeyLabel: {
    id: 'LinearConnectionFormFields.teamKeyLabel',
    defaultMessage: 'Team UUID',
  },
  teamKeyDescription: {
    id: 'LinearConnectionFormFields.teamKeyDescription',
    defaultMessage: 'Press Cmd+K in Linear, search for your team, and copy the UUID (e.g. e367799c-18af-43dc-82a8-bab4511ac996)',
  },
  apiKeyLabel: {
    id: 'LinearConnectionFormFields.apiKeyLabel',
    defaultMessage: 'API Key',
  },
  apiKeyDescription: {
    id: 'LinearConnectionFormFields.apiKeyDescription',
    defaultMessage: 'Go to Linear > Settings > API > Personal API keys to generate a key',
  },
});
