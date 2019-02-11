import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Track } from "./Track";

import { Artist } from "./Artist";
import { Image } from "./Image";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MuzixService {
  thridPartyApi: string;
  tracks: Array<Track>;
  wishListTracks: Array<Track>;
  trackObj: Track;
  artistObj: Artist;
  imageObj: Image;
  apiKey: string;
  trackSubject: BehaviorSubject<any>;
  searchString: string;
  springEndPoint: string;
  id: number;
  errorMsg: string;
  errorStatus: string;
  errorBody: string;
  constructor(private http: HttpClient) {
    // this.tracks = [];
    this.thridPartyApi =
      "http://ws.audioscrobbler.com/2.0?method=geo.gettoptracks&country=";
    this.apiKey = "&api_key=3ae92df17c55c4e622cf1ad22e46f87b&format=json";
    this.trackSubject = new BehaviorSubject([]);
    this.springEndPoint = "http://localhost:8090/api/v1/sangeetservice/";
    // this.id = 0;
  }

  getTrackDetails(country: string): BehaviorSubject<Array<Track>> {
    console.log("Country in service", country);
    const url = `${this.thridPartyApi}${country}${this.apiKey}`;
    console.log("url", url);
    this.tracks = [];
    this.http.get(url).subscribe(track => {
      const data = track["tracks"]["track"];
      this.id = 0;
      data.forEach(targetData => {
        this.id++;
        this.trackObj = new Track();
        this.artistObj = new Artist();
        this.artistObj = targetData["artist"];
        this.imageObj = new Image();
        this.imageObj.text = targetData["image"][2]["#text"];
        this.imageObj.size = targetData["image"][2]["size"];
        this.trackObj = targetData;
        this.trackObj.trackId = country.slice(0, 3) + this.id;
        this.trackObj.artist = this.artistObj;
        // this.artistObj.image = [];
        // this.artistObj.image.push(this.imageObj);
        this.artistObj.image = this.imageObj;
        this.tracks.push(this.trackObj);
        //    this.trackSubject.next(this.trackObj);
      });
      this.trackSubject.next(this.tracks);
    });

    //  console.log('Final tarks' , this.tracks);
    return this.trackSubject;
  }
  filterArtists(searchTerm: string) {
    console.log("In service ", searchTerm);
    const regx = `${searchTerm}`;
    console.log("Regx", regx);
    const results = this.tracks.filter(data => {
      return data.artist.name.match(regx);
      // return data.artist.name.includes(searchTerm);
    });
    console.log("Filetred data", results);

    this.trackSubject.next(results);
  }

  addTracktoWishList(track: Track) {
    // this.trackObj.trackId = ++this.id;
    // track.trackId = this.trackObj.trackId;
    return this.http
      .post(this.springEndPoint + "track", track, { observe: "response" })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // this.errorMsg = error.error.message;
      console.log("An error occured :", error.error.message);
    } else {
      this.errorStatus = `${error.status}`;
      console.log("Error msg", this.errorStatus);
      this.errorBody = `${error.error}`;
      console.log(
        `Backened returned code ${error.status},` + `body was :${error.error}`
      );
    }

    return throwError(this.errorStatus);
  }

  // getAllWishListTrack(): Observable<Track[]> {

  //  return this.http.get<Track[]>(this.springEndPoint + 'tracks');

  // }

  getAllWishListTrack1(): BehaviorSubject<Array<Track>> {
    this.tracks = [];
    this.http.get<Track[]>(this.springEndPoint + "tracks").subscribe(data => {
      console.log("data in service", data);
      this.tracks = data;
      this.trackSubject.next(this.tracks);
    });
    // console.log('Tracks in Service after getting from data' , this.tracks);
    return this.trackSubject;
  }
  // deleteTrackFromWishList(track) {
  // // const id = track.trackId;
  // const id = track.trackId;
  // console.log('id in service' , id);
  // const url = this.springEndPoint + 'track/' + `${id}`;
  //   return this.http.delete(url , {responseType : 'text'})
  //   .pipe(
  //     catchError(this.handleError));
  // }

  deleteTrackFromWishList(track): BehaviorSubject<Array<Track>> {
    // const id = track.trackId;
    const id = track.trackId;
    console.log("id in service", id);
    const url = this.springEndPoint + "track/" + `${id}`;
    this.http.delete(url, { responseType: "text" }).subscribe(data => {});

    const index = this.tracks.indexOf(track);
    this.tracks.splice(index, 1);

    this.trackSubject.next(this.tracks);

    return this.trackSubject;

    // .pipe(
    //   catchError(this.handleError));
  }

  updateComments(track) {
    const id = track.trackId;
    // const comments ;
    const com = track.comments;
    console.log("service comments", com);
    // const url = this.springEndPoint + 'track/' + `${id}?comments=${com}`;
    const url = this.springEndPoint + "track/" + `${id}`;
    return this.http.put(url, track, { observe: "response" });
    // .pipe(catchError(this.handleError));
  }
}
