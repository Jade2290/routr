/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster
 *
 * This file is part of Routr.
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Assertions as A } from "@routr/common"

A.assertEnvsAreSet(["RTPENGINE_HOST"])

export const RTPENGINE_HOST = process.env.RTPENGINE_HOST
export const RTPENGINE_PORT = parseInt(process.env.RTPENGINE_PORT ?? "22222")
export const RTPENGINE_TIMEOUT = parseInt(
  process.env.RTPENGINE_TIMEOUT ?? "5000"
)
