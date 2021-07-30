import { Injectable } from '@nestjs/common'
import qiniu from 'qiniu'

import { SETTINGS } from '../../settings'


@Injectable()
export default class QiniuService {

  public getUploadToken (endUser = 'anonymous', sync = false) {
    const mac = new qiniu.auth.digest.Mac(
      SETTINGS.QINIU_ACCESS_KEY,
      SETTINGS.QINIU_SECRET_KEY
    )

    const returnBody = `{
      "key": $(key),
      "name": $(fname),
      "hash": $(etag),
      "ext": $(ext),
      "size": $(fsize),
      "mimeType": $(mimeType),
      "imageInfo": $(imageInfo),
      "userId": $(x:userId),
      "url": "${SETTINGS.QINIU_URL}$(key)"
    }`.replace(/\s/g, '')

    /** @ref https://developer.qiniu.com/kodo/manual/1206/put-policy */
    const policy = {
      scope: SETTINGS.QINIU_SCOPE,
      expires: 86400,
      mimeLimit: 'image/*',
      saveKey: '$(year)/$(mon)/$(day)/$(etag)$(ext)',
      endUser,
      returnBody,
    }
    const putPolicy = new qiniu.rs.PutPolicy(Object.assign(policy,
      sync && {
        callbackUrl: `${SETTINGS.DEV ? SETTINGS.FRP_SERVER_URL : SETTINGS.SERVER_URL}/qiniu/upload_callback`,
        callbackBody: returnBody,
        callbackBodyType: 'application/json',
      }
    ))

    return putPolicy.uploadToken(mac)
  }

}
