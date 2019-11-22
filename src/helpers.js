export function api31Call(method, path, queryParams, payload) {
  let url = '/api/internal/core/3.1' + [path, queryParams].join('?')
  let obj = { 
    method: method,
    headers: {
      "x-csrf-token": readCookie('CSRF-TOKEN')
    },
    body: JSON.stringify(payload)
  }
  return fetch(url, obj).then(
    response =>  response.json())
}
  
function readCookie(cookieName) {
  var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
  var sMatch = (' '+document.cookie).match(re);
  if (cookieName && sMatch) return unescape(sMatch[1]);
  return '';
}

export async function getPivotSpaceLooks () {
  var user = await api31Call('GET','/user')
  var personal_space = api31Call('GET','/spaces/search',`parent_id=${user.personal_space_id}&name=_pivot_extension`)
  var shared_space = api31Call('GET','/spaces/search',`parent_id=1&name=_pivot_extension`)

  var [ps,ss] = await Promise.all([personal_space,shared_space])

  var looks = []

  if (ps.length === 0) {
    api31Call('POST','/spaces','',{
      parent_id: user.personal_space_id,
      name: '_pivot_extension'
    })
  } else {
    looks = looks.concat(ps[0].looks)
  }

  if (ss.length === 0 ) {
    api31Call('POST','/spaces','',{
      parent_id: 1,
      name: '_pivot_extension'
    })
  } else {
    looks = looks.concat(ss[0].looks)
  }

  return looks
}

function getLabel(field) {
  return field.label_short || field.label || field.name
}

export function jsonLabel (data,fields) {
  const dt = data.map(row => {
    var tmp = {}
    Object.keys(row).forEach(key => {
      const field = fields.filter(f=>{return f.name === key})[0]
      if (field) {
        const field_label = getLabel(field)
        tmp[field_label] = row[key]
      }

    })
    return tmp
  })
  return dt
}

export function hideCategory(fields,type) {
  const filtered = fields.filter(f=>{ return f.category === type})
  return filtered.map(function (f) { return getLabel(f)})
}