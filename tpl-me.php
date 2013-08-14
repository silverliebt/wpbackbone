<?php
/*
	Template Name: Me
*/ 
get_header(); ?>
 
    <section id='me' class="page">
 
        <div class="inner scrollpane">

        <!-- Menu -->
            <div class="wide welcome"> 
                <img src="<?php echo get_image( get_field('photo') ); ?>" alt="me photo" />
                
                <div class="menu">
                    <p class="hello">Hiya! SCROLLDOWN FOR MY <span id="bio-link">BIO</span>, <span id="skills-link">SKILLS</span> & <span id="exp-link">WORK EXPERIENCE</span> OR DOWNLOAD CV @ BOTTOM RIGHT</p>
                    <ul class="stripes menubg">
                        <!-- add stripes using js -->
                    </ul>  
                </div>
            </div>

            
        <!-- Sine Wave -->
            <div class="bg-wrap"> 
                <ul class="stripes bg" id="bg-stripes">
                    <!-- add stripes using js -->
                </ul>  
            </div>


        <!-- Biography -->
            <div class="bio narrow"> 
 
                <div id="sinceCountdown"></div>            

                <h1><?php the_field('title'); ?></h1>
                <div class="content"><?php the_field('content'); ?></div>
                <p class="readon">Read on</p>
            </div>


        <!-- Skills -->
            <div class="skills">

                <div class="wide clearfix">
                    
                    <h1>SKILLS</h1> 

                    <div class="skill-titles clearfix">
                        <p>Design</p><p>Development</p>
                    </div>    
                    
                <!-- Design -->
                    <section class="design ">

                        <?php if( get_field('skill_group_design') ): ?>
                            <?php while( has_sub_field('skill_group_design') ): ?>
                         
                                <div class="skill"  data-percent="<?php the_sub_field('skill_number'); ?>">
                                    
                                    <div class="content">
                                        <p><?php the_sub_field('skill_title'); ?></p>
                                        <h2>0</h2>
                                    </div>

                                    <div class="pie">
                                        <div class="inner-circle"></div> 
                                         <div class="rightside">
                                             <div class="inner"></div>
                                         </div>
                                         <div class="leftside">
                                             <div class="inner"></div>
                                         </div>

                                        <div class="spacer"></div>
                                        <div class="aspect-ratio"></div>
                                    </div> 
                                   
                                </div>

                            <?php endwhile; ?>
                        <?php endif; ?>
                    </section>


                <!-- Dev -->
                    <section class="development "> 

                        <?php if( get_field('skill_group_development') ): ?>
                            <?php while( has_sub_field('skill_group_development') ): ?>
                         
                                <div class="skill"  data-percent="<?php the_sub_field('skill_number'); ?>">
                                    
                                    <div class="content">
                                        <p><?php the_sub_field('skill_title'); ?></p>
                                        <h2>0</h2>
                                    </div>
                                    
                                    <div class="pie">
                                        <div class="inner-circle"></div> 
                                         <div class="rightside">
                                             <div class="inner"></div>
                                         </div>
                                         <div class="leftside">
                                             <div class="inner"></div>
                                         </div>

                                        <div class="spacer"></div>
                                        <div class="aspect-ratio"></div>
                                    </div>
                                </div>

                            <?php endwhile; ?>
                        <?php endif; ?>
                    </section>
                </div>
            </div>


        <!-- Work Experience Table -->
            <div class="experience narrow linkedin">  

                <h1>Work Experience</h1> 


                <div class="key clearfix">
                    <div class="design">
                        <div class="design-icon icon"></div>
                        <p>Design</p> 
                    </div> 
                    <div class="development">
                        <div class="development-icon icon"></div>
                        <p>Development</p> 
                    </div> 
                    <div class="motion">
                        <div class="motion-icon icon"></div>
                        <p>Motion</p> 
                    </div> 
                </div>


                <div class="title row clearfix">
                    <div class="client">
                        <h1>Client</h1> 
                    </div> 
                    <div class="work">
                        <h1>Work</h1> 
                    </div> 
                    <div class="date">
                        <h1>Date</h1> 
                    </div> 
                </div>


                <?php if( get_field('work_experience') ): ?>
                    <?php while( has_sub_field('work_experience') ): ?>
                        <div class="job row clearfix">
                            <div> 
                                <p><?php the_sub_field('client'); ?></p> 
                            </div> 
                            <div>
                                <?php  
                                    if(get_sub_field('position'))
                                    { 
                                        $choices = get_sub_field('position');

                                        foreach( $choices as $choice )
                                        {
                                            ?><div class="<?php echo $choice; ?>-icon icon"></div><?php 
                                        }
                                    }
                                ?>  
                            </div> 
                            <div class="date"> 
                                <p><?php the_sub_field('date'); ?></p> 
                            </div> 
                        </div>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>        
        </div>
   
    </section>
<?php get_footer(); ?>