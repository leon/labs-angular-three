import { Component, ChangeDetectionStrategy } from '@angular/core'
import { ThreeComponent, ThreeNode } from '../three'
import { SphereBufferGeometry, MeshStandardMaterial, Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

@Component({
  selector: 'wec-scene',
  template: '<ng-container></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneNode extends ThreeNode {
  constructor(public three: ThreeComponent) {
    super(three)
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.testCube()
  }

  testOther() {
    const sphereGeo = new SphereBufferGeometry(10, 64, 64)
    const sphereMat = new MeshStandardMaterial({
      metalness: 0.9,
      roughness: 0.1,
      color: 'green',
      // envMap: this.envMap,
    })
    const sphere = new Mesh(sphereGeo, sphereMat)
    sphere.position.x = 50
    sphere.position.y = 50
    sphere.position.z = 50
    this.scene.add(sphere)

    console.log('scene init')
  }

  testCube() {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    this.scene.add(cube)

    this.camera.position.z = 5
  }
}
