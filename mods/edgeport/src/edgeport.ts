/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr
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
declare const Java: any

import {
  assertHasSecurityContext,
  assertNoDuplicatedPort,
  assertNoDuplicatedProto
} from "./assertions"
import { EdgePortConfig } from "./types"
import createListeningPoints from "./create_listening_points"
import createSipProvider from "./create_sip_provider"
import createSipStack from "./create_sip_stack"
import getServerProperties from "./server_properties"

const GRPCSipListener = Java.type("io.routr.GRPCSipListener")
const ArrayList = Java.type("java.util.ArrayList")

export default function EdgePort(config: EdgePortConfig) {
  assertNoDuplicatedProto(config.spec.transport)
  assertNoDuplicatedPort(config.spec.transport)
  assertHasSecurityContext(config)

  const sipStack = createSipStack(getServerProperties(config))
  const sipProvider = createSipProvider(sipStack,
    createListeningPoints(sipStack, config))

  const externalAddrs = new ArrayList()
  const localnets = new ArrayList()

  config.spec.externalAddrs?.forEach((addr: string) => externalAddrs.add(addr))
  config.spec.localnets?.forEach((net: string) => localnets.add(net))

  sipProvider.addSipListener(
    new GRPCSipListener(sipProvider, config, externalAddrs, localnets))
}
