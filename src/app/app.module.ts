import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { ThreeComponent } from './three/three.component'
import { SceneNode } from './scene/scene.node'
import { PanoramaNode } from './scene/panorama.node'

@NgModule({
  declarations: [AppComponent, ThreeComponent, SceneNode, PanoramaNode],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
