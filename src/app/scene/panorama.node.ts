import { Component, ChangeDetectionStrategy, Input } from '@angular/core'
import { ThreeComponent, ThreeNode } from '../three'
import {
  SphereBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  EquirectangularReflectionMapping,
  LinearFilter,
  LinearMipMapLinearFilter,
  sRGBEncoding,
} from 'three'

@Component({
  selector: 'wec-panorama',
  template: '<ng-container></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanoramaNode extends ThreeNode {
  @Input()
  url: string

  constructor(public three: ThreeComponent) {
    super(three)
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.init()
  }

  init() {
    const geometry = new SphereBufferGeometry(512, 64, 64)
    geometry.scale(-1, 1, 1)

    const textureLoader = new TextureLoader()
    const texture = textureLoader.load(this.url)
    texture.mapping = EquirectangularReflectionMapping
    texture.magFilter = LinearFilter
    texture.minFilter = LinearMipMapLinearFilter
    texture.encoding = sRGBEncoding

    const material = new MeshBasicMaterial({ map: texture })

    const mesh = new Mesh(geometry, material)
    mesh.name = 'panorama'
    this.scene.add(mesh)

    console.log('scene init')
  }
}
