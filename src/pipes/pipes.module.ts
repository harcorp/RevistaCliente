import { NgModule } from '@angular/core';
import { UrlPipe } from './../pipes/url/url';
import { YoutubePipe } from './../pipes/youtube/youtube';
import { GetNamePipe } from './../pipes/get-name/get-name';
@NgModule({
	declarations: [UrlPipe,
    YoutubePipe,
    GetNamePipe],
	imports: [],
	exports: [UrlPipe,
    YoutubePipe,
    GetNamePipe]
})
export class PipesModule {}
