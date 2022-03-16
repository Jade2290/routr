/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr
 *
 * Licensed under the MIT License (the "License")
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
import { calculateAuthResponse } from "@routr/common"
import { createUnauthorizedResponse, getCredentials } from "./utils"
import logger from "@fonoster/logger"
import { User } from "./types"

// This processor returns upstream the message received
export default function getProcessor(users: User[]) {
  return (call: any, callback: Function) => {
    logger.verbose(JSON.stringify(call.request, null, ' '))
    const auth = {...call.request.message.authorization}

    // Calculate and return challenge
    if (call.request.message.authorization) {
      
      auth.method = call.request.method

      // Calculate response and compare with the one send by the endpoint
      const res = calculateAuthResponse(auth, getCredentials(auth.username, users))

      if (res !== auth.response) {
        callback(null, createUnauthorizedResponse(auth.realm))
      }
    } else {
      callback(null, createUnauthorizedResponse(auth.realm))
      return
    }

    // Forward request to next middleware
    callback(null, call.request)
  }
}
