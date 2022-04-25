module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
  const obj = yaml.parse(raw)
  const proxyNames = obj.proxies.map(p => p.name)

  // completed proxy groups
  const completedProxyGroups = [
    {
      name: '1️⃣节点一',
      type: 'select',
      proxies: ['DIRECT', 'REJECT', ...proxyNames],
    },
    {
      name: '2️⃣节点二',
      type: 'select',
      proxies: ['DIRECT', 'REJECT', ...proxyNames],
    },
    {
      name: '3️⃣节点三',
      type: 'select',
      proxies: ['DIRECT', 'REJECT', ...proxyNames],
    },
  ]

  // limited proxy groups
  const limitedProxies = ['DIRECT', 'REJECT', '1️⃣节点一', '2️⃣节点二', '3️⃣节点三']
  const limitedProxyGroup = [
    {
      name: '🚻5ch',
      type: 'select',
    },
    {
      name: '💻Github',
      type: 'select',
    },
    ...obj['proxy-groups']
  ]
  for (const group of limitedProxyGroup) {
    group.proxies = limitedProxies
  }

  // merge completed and limited proxy groups
  obj['proxy-groups'] = [
    ...completedProxyGroups,
    ...limitedProxyGroup,
  ]

  // prepend additional rules
  const additionalRules = [
    'DOMAIN-SUFFIX,5ch.net,🚻5ch',
    'DOMAIN-KEYWORD,github,💻Github',
    'IP-CIDR,20.205.243.0/24,💻Github,no-resolve',
  ]
  obj.rules = [
    ...additionalRules,
    ...obj.rules,
  ]

  return yaml.stringify(obj)
}
