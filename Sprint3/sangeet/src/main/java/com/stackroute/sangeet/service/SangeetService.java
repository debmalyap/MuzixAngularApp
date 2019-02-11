package com.stackroute.sangeet.service;

import com.stackroute.sangeet.domain.Track;
import com.stackroute.sangeet.exception.TrackAlreadyExistException;
import com.stackroute.sangeet.exception.TrackNotFoundException;

import java.util.List;

public interface SangeetService {
    Track saveTrackToWishList(Track track) throws TrackAlreadyExistException;
    boolean deleteTrackFromWishList(String id) throws TrackNotFoundException;
    Track updateCommentForTrack(String comments,String id) throws TrackNotFoundException;
    List<Track> getAllTrackFromWishList() throws Exception;
}
