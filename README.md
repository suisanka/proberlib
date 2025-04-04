# diving-fish 查分器 (maimai DX) JS Library

## Example
```typescript
import { ApiEndpoint } from 'maimaidx-proberlib'

const endpoint = new ApiEndpoint('https://www.diving-fish.com/api/maimaidxprober/')

const user = await endpoint.login('username', 'password')

// 获取用户是否同意用户协议
await user.hasAcceptedAgreement()

// 更新用户是否同意用户协议
await user.acceptAgreement()

// 获取用户资料
await user.getProfile()

// 获取 Best 50
await user.getBestRecords()
```