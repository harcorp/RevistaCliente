import { NgModule } from '@angular/core';
import { UrlPipe } from './../pipes/url/url';
import { YoutubePipe } from './../pipes/youtube/youtube';
@NgModule({
	declarations: [UrlPipe,
    YoutubePipe],
	imports: [],
	exports: [UrlPipe,
    YoutubePipe]
})
export class PipesModule {}
