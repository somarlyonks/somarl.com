import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewImageInput, ImagesArgs } from './dto'
import { Image } from './models'
import ImageService from './service'


@Resolver(() => Image)
export default class ImageResolver {
  public constructor (
    private readonly imageService: ImageService
  ) {}

  @Query(returns => Image)
  public async image (@Args('id') id: S) {
    const image = this.imageService.findOneById(id)
    if (!await image) throw new NotFoundException(id)

    return image
  }

  @Query(returns => [Image])
  public images (@Args() imagesArgs: ImagesArgs) {
    return this.imageService.findAll(imagesArgs)
  }

  @Mutation(returns => Image)
  public async addImage (
    @Args('newImageData') newImageData: NewImageInput
  ) {
    return this.imageService.create(newImageData)
  }

  @Mutation(returns => Boolean)
  public async removeImage (@Args('id') id: S) {
    return this.imageService.removeById(id)
  }
}
