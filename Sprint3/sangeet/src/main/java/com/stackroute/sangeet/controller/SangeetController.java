package com.stackroute.sangeet.controller;

import com.stackroute.sangeet.domain.Track;
import com.stackroute.sangeet.exception.TrackAlreadyExistException;
import com.stackroute.sangeet.exception.TrackNotFoundException;
import com.stackroute.sangeet.service.SangeetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/sangeetservice/")
public class SangeetController {

    private ResponseEntity responseEntity;
    private SangeetService sangeetService;

    public SangeetController(final SangeetService sangeetService) {
        this.sangeetService = sangeetService;
    }

    @PostMapping("track")
    public ResponseEntity<?> saveTrackToWishList(@RequestBody Track track) throws TrackAlreadyExistException {
        try {
            sangeetService.saveTrackToWishList(track);
            responseEntity=new ResponseEntity(track, HttpStatus.CREATED);
        }
        catch (TrackAlreadyExistException ex) {
            throw new TrackAlreadyExistException();
        }
        catch (Exception ex) {
            responseEntity = new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
       return responseEntity;
    }
    @DeleteMapping("track/{id}")
    public ResponseEntity<?> deleteTrackFromWishList(@PathVariable("id") String id) throws TrackNotFoundException {
        try{
            sangeetService.deleteTrackFromWishList(id);
            responseEntity=new ResponseEntity("Deleted successfully",HttpStatus.OK);
        }
        catch (TrackNotFoundException e1){
            throw new TrackNotFoundException();
        }
        catch (Exception ex)
        {
            responseEntity=new ResponseEntity("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @PutMapping("track/{id}")
    public ResponseEntity<?> UpdateCommentForTrack(@RequestBody Track track, @PathVariable("id") String id) throws TrackNotFoundException {
        try{
            Track updatedTrack = sangeetService.updateCommentForTrack(track.getComments(),id);
            responseEntity = new ResponseEntity(track, HttpStatus.OK);
        }
        catch (TrackNotFoundException ex) {
            throw new TrackNotFoundException();
        }
        catch (Exception exc){
            responseEntity = new ResponseEntity("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }

    @GetMapping("tracks")
    public ResponseEntity<?> getAllTrackFromWishList() {
        try
        {
            responseEntity=new ResponseEntity(sangeetService.getAllTrackFromWishList(),HttpStatus.OK);
        }
        catch (Exception ex){
            responseEntity=new ResponseEntity("Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;
    }
}
